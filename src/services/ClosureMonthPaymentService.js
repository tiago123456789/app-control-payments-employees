class ClosureMonthPaymentService {

    calculeTotalVouches(vouches) {
        return vouches.reduce((previous, current) => {
            return parseFloat(previous.value || 0) + parseFloat(current.value || 0)
        }, { value: 0 })
    }

    calculeTotalSellOnCredit(sellOneCredits) {
        let result = 0;
        for (let indice = 0; indice < sellOneCredits.length; indice++) {
            result += parseFloat(sellOneCredits[indice].value || 0)
        }
        return result;
    }

    calculeTotalServicePerPieces(servicePerPieces) {
        let result = 0;
        for (let indice = 0; indice < servicePerPieces.length; indice++) {
            const item = servicePerPieces[indice]
            result += parseFloat(item.valuePerPiece) * parseFloat(item.quantityPieces)
        }
        return result;
    }

    calculeTotalWorkOverTimes(workOverTimes) {
        let result = 0;
        for (let indice = 0; indice < workOverTimes.length; indice++) {
            const item = workOverTimes[indice]

            const hourMinute = item.time.split(":")
            item.valuePerHour = parseFloat(item.valuePerHour)
            let valueMoney = 0;
            const isGreatherZeroHour = parseInt(hourMinute[0]) > 0
            if (isGreatherZeroHour) {
                valueMoney = parseInt(hourMinute[0]) * item.valuePerHour;
            }
            const isGreatherZero = parseInt(hourMinute[1]) > 0
            if (isGreatherZero) {
                valueMoney += (item.valuePerHour / parseInt(hourMinute[1])) * parseInt(hourMinute[1])
            }
            result += valueMoney;
        }
        return result;
    }

    calculeValueRestToEmployee(vouchers, sellOnCredits, servicePerPieces, workOverTimes, salary) {
        const totalVouchers = this.calculeTotalVouches(vouchers)
        const totalSellOnCredit = this.calculeTotalSellOnCredit(sellOnCredits)
        const totalServicePerPieces = this.calculeTotalServicePerPieces(servicePerPieces)
        const totalWorkOverTimes = this.calculeTotalWorkOverTimes(workOverTimes)
        salary = salary.replace(".", "")
        let result = parseFloat(salary) + (totalServicePerPieces) + (totalWorkOverTimes)
        result -= (totalVouchers + totalSellOnCredit);
        return result;
    }
}

export default ClosureMonthPaymentService