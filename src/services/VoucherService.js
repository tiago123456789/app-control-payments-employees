import AbstractFirebase from "./AbstractFirebase";


export default class VoucherService extends AbstractFirebase {

    constructor() {
        super()
    }

    register(workOvertime) {
        return this.getFirebase()
            .firestore()
            .collection("vouchers")
            .add(workOvertime);
    }

    getByEmployeeId(employeeId, filter) {
        return this.getFirebase()
            .firestore()
            .collection("vouchers")
            .where("employeeId", "==", employeeId)
            .where("createdAt", ">=", `${filter.dateInitial} 00:00:00`)
            .where("createdAt", "<=", `${filter.dateFinal} 23:59:59`)
            .get()
            .then(this.extractDatas);
    }

}