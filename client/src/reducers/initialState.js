import uuid from 'uuid';

const initialState = {
    login: {
        status: false,
        details: {
            host: '127.0.0.1',
            port: '5672',
            userName: 'guest',
            password: 'guest'
        },
        processing: false,
    },
    dashboard: {
        rabbitmq: {},
        activeTab: 0,
        tabs: [{
            id: uuid.v4(),
        }]
    }
}

export default initialState;
