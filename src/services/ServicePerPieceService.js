import AbstractFirebase from "./AbstractFirebase";


export default class ServicePerPieceService extends AbstractFirebase {

    constructor() {
        super()
    }

    register(workOvertime) {
        return this.getFirebase()
            .firestore()
            .collection("service_per_pieces")
            .add(workOvertime);
    }

    getByEmployeeId(employeeId, filter) {
        return this.getFirebase()
            .firestore()
            .collection("service_per_pieces")
            .where("employee.id", "==", employeeId)
            .where("createdAt", ">=", `${filter.dateInitial} 00:00:00`)
            .where("createdAt", "<=", `${filter.dateFinal} 23:59:59`)
            .get()
            .then(this.extractDatas);
    }

    calculateTotalValuePerService(valuePerPiece, quantityPieces) {
        return parseFloat(valuePerPiece) * parseFloat(quantityPieces)
    }

}