import { of, throwError, Subject } from 'rxjs';
import { catchError, mergeMap, map, take, filter, tap } from 'rxjs/operators';

class Api {

    constructor() {
        this.broker = new Subject();
        window.response = this.response;
    }

    response(type, response) {
        const res = { type, response: JSON.parse(response) };
        this.broker.next(res);  
    }

    login(details) {
        window.Login(JSON.stringify(details));
        const resp$ = this.broker.asObservable();
        return resp$.pipe(
            tap(x => console.log),
            take(1),
            map(x => x.response)
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