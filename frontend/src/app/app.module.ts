import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserModule } from './user/user.module';
import { AnimalModule } from './animal/animal.module';
import { ProfileService } from './services/profile.service';
import { MenuComponent } from './menu/menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BaseUrlInterceptor } from './http-interceptors/base-url.interceptors';
import { AuthenticationInterceptor } from './http-interceptors/AuthenticationInterceptor';
import { authInterceptor } from './http-interceptors';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AnimalModule,
    UserModule,
    AppRoutingModule

  ],
  providers: [ProfileService,httpInterceptorProviders, authInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
