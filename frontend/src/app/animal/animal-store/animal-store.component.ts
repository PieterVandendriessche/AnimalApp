import { Component, OnInit } from '@angular/core';
import { User } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-store',
  templateUrl: './animal-store.component.html',
  styleUrls: ['./animal-store.component.css'],

})
export class AnimalStoreComponent implements OnInit {

  private _user: User;
  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    this._user = this.profileService._user.value;


  }
}
