function Mock() {
    window.Request = function(resType, resId, content) {
        switch(resType) {
            case 'LOGIN': {
                setTimeout(() => {
                    window.response('LOGIN_RESPONSE', resId, 'SUCCESS',  JSON.stringify({
                        brokerInfo: [{
                            destination: "Test",
                            destination_type: "queue",
                            properties_key: "Test",
                            routing_key: "Test",
                            source: "",
                            vhost: "/"
                        }],
                        queues: [{
                            name: "Test",
                            state: "running",
                            vhost: "/"
                        }],
                    }), '{}');
                }, 1000);
                break;
            }
            case 'TAP': {
                console.log(resType, resId, content);
                window.response('TAP', resId, 'START', JSON.stringify(
                    {}
                ))
                break;
            }
            default:
                console.log('invalid request');
        }
    }
}

export default Mock;