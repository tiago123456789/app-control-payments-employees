import AbstractFirebase from "./AbstractFirebase"

export default class AuthService extends AbstractFirebase {

    constructor() {
        super()
    }

    logout() {
        localStorage.removeItem("id")
        this.getFirebase().auth().signOut();
    }

    async signIn(email, password) {
        return new Promise((resolve, reject) => {
            this.getFirebase()
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(resolve)
                .catch(reject);
        });
    }

    isAuthenticated() {
        return localStorage.getItem("id") != null;
    }
}