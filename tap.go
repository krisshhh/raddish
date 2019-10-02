package main 

import (
	"context"
	"crypto/tls"
	"golang.org/x/sync/errgroup"
	rabtap "github.com/jandelgado/rabtap/pkg"
)

func CreateNewTap(ctx context.Context, tapConfig []rabtap.TapConfiguration, tlsConfig *tls.Config,
	messageReceiveFunc MessageReceiveFunc) {

	g, ctx := errgroup.WithContext(ctx)

	// this channel is used to decouple message receiving threads
	// with the main thread, which does the actual message processing
	tapMessageChannel := make(rabtap.TapChannel)

	// taps := []*rabtap.AmqpTap{}
	for _, config := range tapConfig {
		tap := rabtap.NewAmqpTap(config.AmqpURI, tlsConfig, log)
		// taps = append(taps, tap)
		g.Go(func() error {
			return tap.EstablishTap(ctx, config.Exchanges, tapMessageChannel)
		})
	}
	g.Go(func() error {
		return messageReceiveLoop(ctx, tapMessageChannel, messageReceiveFunc)
	})
	if err := g.Wait(); err != nil {
		log.Errorf("tap failed with %v", err)
	}
}

