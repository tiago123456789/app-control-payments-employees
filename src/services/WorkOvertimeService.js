import AbstractFirebase from "./AbstractFirebase";


export default class WorkOvertimeService extends AbstractFirebase {

    constructor() {
        super()
    }

    register(workOvertime) {
        return this.getFirebase()
            .firestore()
            .collection("work_overtimes")
            .add(workOvertime);
    }

    getByEmployeeId(employeeId, filter) {
        return this.getFirebase()
            .firestore()
            .collection("work_overtimes")
            .where("employeeId", "==", employeeId)
            .where("createdAt", ">=", `${filter.dateInitial} 00:00:00`)
            .where("createdAt", "<=", `${filter.dateFinal} 23:59:59`)
            .get()
            .then(this.extractDatas);
    }

    calculeValueMoney(time, valuePerHour) {
        const hourMinute = time.split(":")
        valuePerHour = parseFloat(valuePerHour)
        let valueMoney = 0;
        const isGreatherZeroHour = parseInt(hourMinute[0]) > 0
        if (isGreatherZeroHour) {
            valueMoney = parseInt(hourMinute[0]) * valuePerHour;
        }
        const isGreatherZero = parseInt(hourMinute[1]) > 0
        if (isGreatherZero) {
            valueMoney += (valuePerHour / parseInt(hourMinute[1])) * parseInt(hourMinute[1])
        }
        return valueMoney;
    }
}