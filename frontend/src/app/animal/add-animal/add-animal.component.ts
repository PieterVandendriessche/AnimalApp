import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { Soort } from '../../models/soort';
import { Type } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimalDataService } from '../../services/animal-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  public animal: FormGroup;
  @Output() public newAnimal = new EventEmitter<Animal>();
  private user: User;
  constructor(public toastr: ToastrService, private _animalDataService: AnimalDataService, private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.user = this.profileService._user.value;
    if (this.user == null) {
      this.router.navigate(['./']);
    }
  }

  createForm() {
    this.animal = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      soort: new FormControl(Soort.AAP),
      gender: new FormControl("♂️ Male"),

    })
  }
  onSubmit(): boolean {
    if (this.animal.valid) {
      try {
        this.user.takeMoney(25);
      } catch (err) {
        this.toastr.warning(err.message, 'Opgelet!')
        return;
      }


      let newAnimal = new Animal(this.animal.value.name, (this.animal.value.gender == "♂️ Male" ? true : false), new Date(), this.animal.value.soort, new Date(), new Date(), 15, this.generateRandomNumber(), this.generateRandomNumber(), new Date())
      this._animalDataService.addNewAnimal(newAnimal, this.user.username).subscribe(item => {
        this.profileService.updateProfile(this.user).subscribe(item => {
          this.toastr.success('Jouw dier ' + newAnimal.name + ' is succesvol geadopteerd!', 'Gefeliciteerd!');
          this.router.navigate(['./animal-list']);
        })
      }, (err: HttpErrorResponse) => {
        this.toastr.error('Je bent niet ingelogd!', 'Opgelet!')
      });


    } else {
      this.toastr.info('De naam van een dier moet bestaan uit minimaal 3 karakters.', 'Opgelet!');
    }


    return false;
  }

  getGender(): String[] {
    return ["♂️ Male", "♀️️ Female"];
  }

  getSoort(): Soort[] {
    return [Soort.AAP, Soort.BEVER, Soort.EEND, Soort.EZEL, Soort.HONDDONKER, Soort.KUIKEN, Soort.PINGUIN, Soort.VARKEN];
  }
  get imageUrl(): String {
    return "assets/images/" + this.animal.value.soort + ".png"
  }

  private generateRandomNumber(): number{
    return Math.floor(Math.random() * (100 - 1)) + 1;
  }


}
