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
    const tap = {}
    const subscribe = {}
    const publish = {
        onProcess: false,
        exchange: '',
        routeKey: '',
        headers: [],
        body: ''
    }
    return {
        id: uuid.v4(),
        activeMenu: '',
        menu: { tap, subscribe, publish }
    }
}
