import AbstractFirebase from "./AbstractFirebase";


export default class EmployeeService extends AbstractFirebase {

    constructor() {
        super()
    }

    register(employee) {
        return this.getFirebase()
        .firestore()
        .collection("employees")
        .add(employee);
    }

    async getAll() {
        return this.getFirebase()
        .firestore()
        .collection("employees")
        .get()
        .then(this.extractDatas);
    }

    getById(id) {
        return this.getFirebase()
        .firestore()
        .collection("employees")
        .doc(id)
        .get()
        .then(this.extractData); 
    }

   
}