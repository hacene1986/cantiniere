export class User {
    id?: number;
    name: string;
    firstname: string;
    sex?: number;
    email: string;
    phone: string;
    password: string;
    address: string;
    postalCode: string;
    town: string;
    isLunchLady: number;
    wallet: number;
    image64?: string;

    constructor(
        id: number, name?: string, firstname?: string, sex?: number,
        email?: string, phone?: string, password?: string,
        address?: string, postalCode?: string, town?: string,
        islunchlady?: number, wallet?: number, image64?: string) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.sex = sex;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.address = address;
        this.postalCode = postalCode;
        this.town = town;
        this.isLunchLady = islunchlady;
        this.wallet = wallet;
        this.image64 = image64;
    }
}
