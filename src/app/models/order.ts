import { User } from './user';
import { Menu } from './menu';
import { Quantity } from './quantity';
export class Order {
    id?: number;
    status?: number;
    creationDate?: Date;
    menuId: number;
    userId: number;
    quantities: Quantity[];
    menu?: Menu;
    constructor(
        id: number,
        menuId: number,
        userId: number,
        status: number,
        creationDate: Date,
        quantities: Quantity[]
    ) {
        this.id = id;
        this.status = status;
        this.creationDate = creationDate;
        this.menuId = menuId;
        this.userId = userId;
        this.quantities = quantities;
    }

}
