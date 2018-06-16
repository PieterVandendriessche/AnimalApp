import { Soort } from "./soort";
import { Observable } from "rxjs/Rx";

export class Animal {

    private _id: string;
    private _name: string;
    private _male: boolean
    private _birthdate: Date;
    private _soort: Soort
    private _food: number;
    private _pleasure: number;
    private _drink: number;
    private _petted: boolean = false;
    private _lastFoodUpdate: Date;
    private _lastDrinkUpdate: Date;
    private _lastPleasureUpdate: Date;
    private _alive: boolean = true;

    constructor(name: string, male: boolean, birthdate: Date, soort: string, lastFood: Date, lastDrink: Date, food: number, drink: number, pleasure: number, lastPleasure: Date, id?: string) {
        this._name = name;
        this._id = id;
        this._male = male;
        this._birthdate = birthdate;
        this._lastFoodUpdate = lastFood
        this._lastDrinkUpdate = lastDrink;
        this._lastPleasureUpdate = lastPleasure;
        this._drink = drink;
        this._food = food;
        this._pleasure = pleasure;
        this._soort = this.geefSoort(soort);
        this.calculateFood();
        this.calculateDrink();
        this.calculatePleasure();

        /*Dit update de progressbar steeds naar de exacte waarde */
        Observable.interval(1000 * 60).subscribe(x => {
            this.calculateFood();
            this.calculateDrink();
            this.calculatePleasure();

        });
    }

    get name(): string {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get male(): boolean {
        return this._male;
    }
    get lastFood(): Date {
        return this._lastFoodUpdate;
    }
    get lastDrink(): Date {
        return this._lastDrinkUpdate;
    }

    get age(): number {
        if (!this._alive) {
            return 0;
        }
        /*Elke dag komt er 1 'jaar' bij */
        return Math.round(Math.abs((this._birthdate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));
    }

    get birthdate(): Date {
        return this._birthdate;
    }

    get soort(): string {
        return this._soort;
    }

    get isPetted(): boolean {
        return this._petted;
    }
    get isAlive(): boolean {
        return this._alive;
    }
    get imageUrl(): string {
        return "assets/images/" + this.soort + ".png"
      }

    get mood(): string {
        if (!this._alive) {
            return "🧟";
        }
        if (this._food < 20 || this._drink < 20) {
            return '😭';
        }
        else
            return '💕';
    }

    
    get food(): number {
        if (!this._alive)
            return 0;
        return this._food;
    }
    get pleasure(): number {
        if (!this._alive)
            return 0;
        return this._pleasure;
    }

    get drink(): number {
        if (!this._alive)
            return 0;
        return this._drink;
    }

    pet() {
        this._petted = true;
        this.increasePleasure(2);

        setTimeout(() => {
            this._petted = false;
        }, 2000);
    }

    

    increaseFood(amount: number): boolean {
        if (!this._alive) {
            return false;
        }

        if (this._food + amount <= 100) {
            this._food += amount;

        }
        else if (this._food != 100) {

            this._food = 100;
        }
        else return false;
        this._lastFoodUpdate = new Date();
        return true;
    }

    increaseDrink(amount: number): boolean {
        if (!this._alive) {
            return false;
        }

        if (this._drink + amount <= 100) {
            this._drink += amount;

        }
        else if (this._drink != 100) {

            this._drink = 100;
        }
        else return false;
        this._lastDrinkUpdate = new Date();
        return true;
    }




    private geefSoort(soort: string): Soort {
        switch (soort) {
            case "Aap": return Soort.AAP;
            case "Ezel": return Soort.EZEL;
            case "Bever": return Soort.BEVER;
            case "Eend": return Soort.EEND;
            case "Hond donker": return Soort.HONDDONKER;
            case "Kuiken": return Soort.KUIKEN;
            case "Varken" : return Soort.VARKEN;
            case "Pinguin" : return Soort.PINGUIN

        }
    }

    private increasePleasure(amount: number) {
        if (this._pleasure + amount <= 100) {
            this._pleasure += amount
        }
        else this._pleasure = 100;

        this._lastPleasureUpdate = new Date();
    }
    /*Hier worden de waarden berekent uit de data */
    private calculateFood() {
        let minutes = this.calculateDifferenceTimeInMinutes(this._lastFoodUpdate);
        let value = Math.ceil(this._food - (minutes / 15));

        if (this._food !== value) {
            this._food = value >= 0 ? value : 0;
            this._lastFoodUpdate = new Date();
        }

        if (this._food == 0) {
            this._alive = false;
            this._soort = Soort.DOOD;
        }
    }

    private calculateDrink() {
        let minutes = this.calculateDifferenceTimeInMinutes(this._lastDrinkUpdate);
        let value = Math.ceil(this._drink - (minutes / 15));

        if (this._drink !== value) {
            this._drink = value >= 0 ? value : 0;
            this._lastDrinkUpdate = new Date();
        }

        if (this._drink == 0) {
            this._alive = false;
            this._soort = Soort.DOOD;
        }

    }

    private calculatePleasure() {

        let minutes = this.calculateDifferenceTimeInMinutes(this._lastPleasureUpdate);
        let value = Math.ceil(this._pleasure - (minutes / 5));

        if (this._pleasure !== value) {
            this._pleasure = value >= 0 ? value : 0;
            this._lastPleasureUpdate = new Date();
        }
    }

    private calculateDifferenceTimeInMinutes(timeItem:Date) : number{
        let difference = (timeItem.getTime() - new Date().getTime())
        return Math.abs(Math.floor(((difference / 1000) / 60)));
      
    }

    toJSON() {
        return {
            name: this._name,
            male: this._male,
            birthdate: this._birthdate,
            food: this._food,
            pleasure: this._pleasure,
            soort: this._soort.toString(),
            drink: this._drink,
            lastFoodUpdate: this._lastFoodUpdate,
            lastPleasureUpdate: this._lastPleasureUpdate,
            lastDrinkUpdate: this._lastDrinkUpdate,
            alive: this._alive
        }
    }
    static fromJSON(item: any): Animal {
        const rec = new Animal(
            item.name, item.male, new Date(item.birthdate), item.soort, new Date(item.lastFoodUpdate), new Date(item.lastDrinkUpdate), item.food, item.drink, item.pleasure, new Date(item.lastPleasureUpdate), item._id

        );
        rec._id = item._id;
        return rec;
    }





}