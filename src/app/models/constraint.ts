export class Constraint {

    id?: number;
    orderTimeLimit?: string;
    maximumOrderPerDay?: string;
    rateVAT?: string;
    constructor(
        id: number,
        orderTimeLimit?: string,
        maximumOrderPerDay?: string,
        rateVAT?: string,
    ) {
        this.id = id;
        this.orderTimeLimit = orderTimeLimit;
        this.maximumOrderPerDay = maximumOrderPerDay;
        this.rateVAT = rateVAT;
    }
}
