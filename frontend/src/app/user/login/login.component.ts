import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../services/profile.service';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < 12
      ? { passwordTooShort: { value: control.value.length } }
      : null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private profileService : ProfileService,
    private router: Router,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
   this.authService.logout()
   setTimeout(() => {
    this.profileService.updateScreen();
   }, 200);
 

    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            this.profileService.updateScreen();
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/animal-list']);
            }
          } else {
            this.toastr.error('Kan niet inloggen!')
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Gebruikersnaam of wachtwoord fout.')
        })
         
    
  }
}
