import { Meal } from './meal';

export class Quantity {
    id?: number;
    quantity?: number;
    meal: Meal;
    constructor(
        id: number,
        quantity: number,
        meal: Meal,
    ) {
        this.id = id;
        this.quantity = quantity;
        this.meal = meal;
    }
}
