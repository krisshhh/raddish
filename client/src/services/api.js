import { of, throwError, Subject } from 'rxjs';
import { catchError, mergeMap, map, take, filter, tap } from 'rxjs/operators';

class Api {

    constructor() {
        this.broker = new Subject();
        window.response = this.response.bind(this);
    }

    response(type, status, response, err) {
        const res = { 
            type, status, err,
            response: JSON.parse(response),
        };
        this.broker.next(res);
    }

    login(details) {
        window.Login(JSON.stringify(details));
        return this.broker.asObservable().pipe(
            filter(e => e.type === 'LOGIN_RESPONSE'),
            map(e => {
                if (e.status === 'SUCCESS') {
                    return e.response;
                } else {
                    throw new Error(e.error);
                }
            }),
            take(1),
        );
    }
}

// return throwError(new Error ({
//     exchanges: [],
//     queues: [],
//     binds: []
// }));

const api = new Api();
export default api;