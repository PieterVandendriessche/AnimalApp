import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs/Observable";
import { error } from "util";

export class User {


    private _username: string;
    private _food: number;
    private _drink: number;
    private _money: number;
    private _lastReward: Date
    constructor(username: string, money: number, food: number, drink: number) {
        this._username = username;
        this._money = money
        this._food = food;
        this._drink = drink;
    }

    ngOnInit() {
    }
    get username(): string {
        return this._username
    }
    get money(): number {
        return this._money;
    }

    get food(): number {
        return this._food;
    }
    get drink(): number {
        return this._drink;
    }

    takeFood() {
        if (this._food > 0) {
            this._food--;
        }
    }
    takeDrink() {
        if (this._drink > 0) {
            this._drink--;
        }
    }

    takeMoney(amount: number) {
        if ((this._money - amount) < 0) {
            throw new Error('Te weinig geld op je rekening!');
        }
        this._money -= amount;
    }
    addFood(amount: number) {

        this._food += amount;
    }
    addDrink(amount: number) {

        this._drink += amount;
    }
    reward() {
        this._money += 1;
    }
    toJSON() {
        return {
            username: this.username,
            money: this.money,
            food: this._food,
            drink: this._drink,

        }
    }
}
