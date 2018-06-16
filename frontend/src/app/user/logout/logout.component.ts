import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private profileService: ProfileService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.authService.logout();
    this.router.navigate(['/login']);
    setTimeout(() => {
      this.profileService.updateScreen();
      
    }, 100);



  }

}
