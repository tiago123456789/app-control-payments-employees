import firebase from "firebase"
let firebaseApp = null;

class AbstractFirebase {

    constructor() {
        this._initialize();
    }

    _initialize() {
        if (firebaseApp != null) {
            return;
        }

        const configurations = {
            apiKey: process.env.REACT_APP_APIKEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DATABASE_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
            appId: process.env.REACT_APP_APPID
        };

        firebaseApp = firebase.initializeApp(configurations);
    }

    getFirebase() {
        return firebaseApp;
    }

    extractDatas(querySnapshot) {
        const documents = []
        querySnapshot.forEach(function(doc) {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    }

    extractData(querySnapshot) {
        return querySnapshot.data();
    }
}

export default AbstractFirebase;