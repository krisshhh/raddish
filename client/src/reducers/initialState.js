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
        tabs: [newTabState({ isActive: true })]
    }
}

export function newTabState({ isActive  }) {
    return {
        id: uuid.v4(),
        isActive,
        exchange: '',
        bindingKey: '',
        isTapping: false,
        processing: false,
        events: [],
        selectedEvent: null,
        tapError: null
    }
}

