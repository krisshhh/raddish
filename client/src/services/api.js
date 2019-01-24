import { of, throwError, Subject } from 'rxjs';
import { catchError, mergeMap, map, take, filter, tap } from 'rxjs/operators';
import uuid from 'uuid';

class Api {

    constructor() {
        this.broker = new Subject();
        window.response = this.response.bind(this);
    }

    request(type, content) {
        const reqId = uuid.v4();
        window.Request(reqId, type, JSON.stringify(content));
        return reqId;
    }

    response(resId, type, status, response, err) {
        const res = {
            resId, type, status, err,
            response: JSON.parse(response),
        };
        this.broker.next(res);
    }

    login(details) {
        const reqId = this.request('LOGIN', details);
        return this.broker.asObservable().pipe(
            filter(e => e.resId === reqId),
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