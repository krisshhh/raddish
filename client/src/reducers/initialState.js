import uuid from 'uuid';

export const initialState = {
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
        tabs: [newTabState()]
    }
}

export function newTabState() {
    const tap = {
        active: true,
    }
    const subscribe = {
        active: false
    }
    const publish = {
        active: false
    }
    return {
        id: uuid.v4(),
        menu: { tap, subscribe, publish }
    }
}
