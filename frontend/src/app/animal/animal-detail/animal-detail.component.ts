import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalDataService } from '../../services/animal-data.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  public _animal: Animal;
  constructor(private route: ActivatedRoute, private router: Router, private animalDataService: AnimalDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item =>
      this._animal = item['animal'] //in resolver zo genoemd

    );
  }
  deleteAnimal() {
    var deleten = confirm("Zeker dat u " + this._animal.name + " wilt verwijderen?");

    if (deleten) {
      this.animalDataService.removeAnimal(this._animal).subscribe(item => this.router.navigate(['./']));
    }
  }
  get imageUrl(): string {
    return this._animal.imageUrl;
  }
  overzicht() {
    this.router.navigate(['/animal-list']);
  }
}
