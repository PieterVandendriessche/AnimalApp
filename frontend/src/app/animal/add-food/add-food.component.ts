import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/profile.model';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  private user: User;
  constructor(public toastr: ToastrService, private profileService: ProfileService, private router: Router) {


  }

  ngOnInit() {
    this.user = this.profileService._user.value;
    if (this.user == null) {
      this.router.navigate(['./']);
    }
  }

  addFood(amount: number, price: number, name: string) {

    try {
      this.user.takeMoney(price);
      this.user.addFood(amount);
      this.profileService.updateProfile(this.user).subscribe(() => this.toastr.success(`${name} succesvol aangekocht.`, "Gelukt!"))
    } catch (err) {
      this.toastr.warning(err.message, 'Opgelet!')
      return;
    }
  }

  addDrink(amount: number, price: number, name: string) {
    try {
      this.user.takeMoney(price);
      this.user.addDrink(amount);
      this.profileService.updateProfile(this.user).subscribe(() => this.toastr.success(`${name} succesvol aangekocht.`, "Gelukt!"))
    } catch (err) {
      this.toastr.warning(err.message, 'Opgelet!')
      return;
    }
  }
}
