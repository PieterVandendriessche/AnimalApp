import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Animal } from './../models/animal.model';
import { AnimalDataService } from "../services/animal-data.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AnimalResolver implements Resolve<Animal> {

    constructor(private animalDataService:AnimalDataService) {}
    
    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<Animal> {
            return this.animalDataService.getAnimal(route.params['id']);
        }
    
}