import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { AnimalDataService } from '../../services/animal-data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
    public _animals: Animal[];
  constructor(private _animalDataService: AnimalDataService,private authService: AuthenticationService) { }

  ngOnInit() {
    this._animalDataService.animals(this.authService.user$.value).subscribe(items => (this._animals = items));

  }

}
