import { of, throwError, Subject } from 'rxjs';
import { catchError, mergeMap, map, take } from 'rxjs/operators';

class Api {

    constructor() {
        this.broker = new Subject();
        window.onLogin = this.onLoginResponse;
    }

    onLoginResponse(response) {
        const res =  JSON.parse(response);
        this.broker.next(res);  
    }

    login(details) {
        window.Login(details);
        const resp$ = this.broker.asObservable();
        return resp$.pipe(take(1));
    }
}

// return throwError(new Error ({
//     exchanges: [],
//     queues: [],
//     binds: []
// }));

const api = new Api();
export default api;