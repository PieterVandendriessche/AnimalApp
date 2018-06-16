import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AnimalDataService {
  private readonly _appUrl = '/API';

  private _animals = new Array<Animal>();

  constructor(private http: HttpClient) { }

  animals(username: string): Observable<Animal[]> {
    return this.http.get(this._appUrl + "/animals/get/" + username)
      .pipe(map((list: any[]): Animal[] =>
        list.map(Animal.fromJSON))

      );
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    return this.http.put(this._appUrl+ '/animals/' + animal.id, animal.toJSON())
      .pipe(map(Animal.fromJSON));
  }

  addNewAnimal(animal: Animal, username: string): Observable<Animal> {
    return this.http.post('/API/animals/add/' + username, animal.toJSON())
      .pipe(map((item: any): Animal =>
        new Animal(item.name, item.male, new Date(item.birthdate), item.soort, new Date(item.lastFoodUpdate), new Date(item.lastDrinkUpdate), item.food, item.drink, item.pleasure, new Date(item.lastPleasureUpdate), item._id))
      );

  }
  getAnimal(id: string): Observable<Animal> {
    return this.http
      .get(`${this._appUrl}/animals/${id}`)
      .pipe(map(Animal.fromJSON));
  }

  removeAnimal(animal: Animal): Observable<Animal> {
    return this.http
      .delete(`${this._appUrl}/animals/${animal.id}`)
      .pipe(map(Animal.fromJSON));
  }
}
