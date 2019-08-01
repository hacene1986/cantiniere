//import { Meal } from './meal';
export class Menu {
    id?: number;
    status?: number;
    label: string;
    description: string;
    priceDF: number;
    availableForWeeks?: string;
    image?: string;
    menu?: any;
    quantity?: any;
    // meals?: Meal[];
    constructor(
        id: number,
        status?: number,
        label?: string,
        description?: string,
        priceDF?: number,
        availableForWeeks?: string,
        image?: string
    ) {
        this.id = id;
        this.status = status;
        this.label = label;
        this.description = description;
        this.priceDF = priceDF;
        this.availableForWeeks = availableForWeeks;
        this.image = image;
    }
}
