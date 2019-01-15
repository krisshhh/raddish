class Api {

    constructor() {}

    login(details) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('hittttttttttttt');
                resolve({
                    exchanges: [],
                    queues: [],
                    binds: []
                })
            }, 1000);
        })
    }
}

const api = new Api();
export default api;