const taps = {}

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
                setTimeout(() => {
                    console.log(resType, resId, content);
                    window.response('TAP', resId, 'START', JSON.stringify({}), '{}')
                }, 0)
                setTimeout(() => {
                    window.response('TAP', resId, 'EVENT', JSON.stringify({}), '{}')
                }, 5000)
                setTimeout(() => {
                    window.response('TAP', resId, 'STOP', JSON.stringify({}), '{}')
                }, 10000)
                break;
            }
            case 'STOP_TAP': {
                setTimeout(() => {
                    window.response('TAP', resId, 'STOP', JSON.stringify({}), '{}')
                }, 0)
                break;
            }
            default:
                console.log('invalid request');
        }
    }
}

export default Mock;