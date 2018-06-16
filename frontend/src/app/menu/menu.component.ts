import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user: User;
  constructor(private toastrService: ToastrService, private profileService: ProfileService, private authService: AuthenticationService) {

  }


  ngOnInit() {


    this.profileService._user.subscribe(t => {
      this.user = t;
    })

    Observable.interval(1000 * 50).subscribe(() => {

      if (this.user != null) {
        this.user.reward()
        this.authService.updateProfile(this.user).subscribe(item => this.toastrService.info("Je hebt 1 dollar krediet gekregen.", ));
      }

    });
  }

}
