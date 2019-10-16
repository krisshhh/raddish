function Mock() {
    window.Request = function(resType, resId) {
        switch(resType) {
            case 'LOGIN': 
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
            default:
                console.log('invalid request');
        }
    }
}

export default Mock;