import AbstractFirebase from "./AbstractFirebase";


export default class SellOnCreditService extends AbstractFirebase {

    constructor() {
        super()
    }

    register(workOvertime) {
        return this.getFirebase()
            .firestore()
            .collection("sell_on_credits")
            .add(workOvertime);
    }

    getByEmployeeId(employeeId, filter) {
        return this.getFirebase()
            .firestore()
            .collection("sell_on_credits")
            .where("employee.id", "==", employeeId)
            .where("createdAt", ">=", `${filter.dateInitial} 00:00:00`)
            .where("createdAt", "<=", `${filter.dateFinal} 23:59:59`)
            .get()
            .then(this.extractDatas);
    }

}