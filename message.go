package main

import (
	"context"
	rabtap "github.com/jandelgado/rabtap/pkg"
)

// MessageReceiveFunc processes receiced messages from a tap.
type MessageReceiveFunc func(rabtap.TapMessage) error

func messageReceiveLoop(ctx context.Context, messageChan rabtap.TapChannel,
	messageReceiveFunc MessageReceiveFunc) error {

	for {
		select {
		case <-ctx.Done():
			log.Debugf("subscribe: cancel")
			return nil

		case message, more := <-messageChan:
			if !more {
				log.Debug("subscribe: messageReceiveLoop: channel closed.")
				return nil
			}
			log.Debugf("subscribe: messageReceiveLoop: new message %#+v", message)
			tmpCh := make(rabtap.TapChannel)
			go func() {
				m := <-tmpCh
				// let the receiveFunc do the actual message processing
				if err := messageReceiveFunc(m); err != nil {
					log.Error(err)
				}
			}()
			select {
			case tmpCh <- message:
			case <-ctx.Done():
				log.Debugf("subscribe: cancel (messageReceiveFunc)")
				return nil
			}
		}
	}
}
