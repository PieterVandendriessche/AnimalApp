import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { Soort } from '../../models/soort';

import { state, trigger, transition, style, animate } from '@angular/animations';
import { AnimalDataService } from '../../services/animal-data.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/profile.model';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  animations: [trigger(
    'fadeIn',

    [state('off', style({ top: '20%', left: '1.09em', opacity: '0' })),
    state('on', style({ top: '20%', left: '1.09em', opacity: '0' })),
    transition(
      'off => on, on => off', [animate(600, style({ opacity: '1', top: '-20%' }))])
    ])],
})
export class AnimalComponent implements OnInit {
  @Input() public animal: Animal;
  public animationState = 'off';
  private _user: User;

  constructor(private _animalDataService: AnimalDataService, private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    this.profileService._user.subscribe(item => this._user = item);
  }

  get foodPecentage(): string {
    return this.animal.food + '%';
  }
  get waterPercentage(): string {
    return this.animal.drink + '%';
  }

  get pleasurePercentage(): string {
    return this.animal.pleasure + '%';
  }

  get age(): string {
    if (!this.animal.isAlive) {
      return "Gestorven";
    }
    else return this.animal.age + ' jaar';
  }

  giveFood() {
    if (this._user.food > 0) {

      if (this.animal.increaseFood(1)) {
        this._user.takeFood();
        this.profileService.updateProfile(this._user).subscribe();
        this._animalDataService.updateAnimal(this.animal).subscribe();
      }
    }
  }
  giveWater() {
    if (this._user.drink > 0) {
      if (this.animal.increaseDrink(1)) {
        this._user.takeDrink();
        this.profileService.updateProfile(this._user).subscribe();
        this._animalDataService.updateAnimal(this.animal).subscribe();
      }
    }
  }
  get imageUrl(): String {
    return this.animal.imageUrl;
  }

  toDetails() {
    this.router.navigate(['./animal-detail/' + this.animal.id]);
  }
  //Animation
  imgClick(event) {
    if (!this.animal.isPetted && this.animal.isAlive) {
      this.toggleState();
      this.animal.pet();
      this._animalDataService.updateAnimal(this.animal).subscribe();

    }
  }
  toggleState() {
    this.animationState = this.animationState === 'off' ? 'on' : 'off'

  }
  

}
