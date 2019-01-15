import { of } from 'rxjs';

class Api {

    constructor() {
    }

    login(details) {
        return of({
            exchanges: [],
            queues: [],
            binds: []
        });
    }
}

const api = new Api();
export default api;