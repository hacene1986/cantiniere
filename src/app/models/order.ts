import { User } from './user';
import { Menu } from './menu';
import { Quantity } from './quantity';
export class Order {
    id?: number;
    status?: number;
    creationDate?: Date;
    menu: Menu;
    user: User;
    quantities: Quantity[];
    constructor(
        id: number,
        menu: Menu,
        user: User,
        status: number,
        creationDate: Date,
        quantities: Quantity[]
    ) {
        this.id = id;
        this.status = status;
        this.creationDate = creationDate;
        this.menu = menu;
        this.user = user;
        this.quantities = quantities;
    }

}
