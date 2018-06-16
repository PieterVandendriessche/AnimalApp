import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimalDataService } from '../services/animal-data.service';
import { AnimalComponent } from './animal/animal.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { RouterModule } from '@angular/router';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalResolver } from '../services/animal-resolver';
import { AuthGuardService } from '../services/auth-guard.service';
import { AnimalStoreComponent } from './animal-store/animal-store.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { BaseUrlInterceptor } from '../http-interceptors/base-url.interceptors';
import { AuthenticationInterceptor } from '../http-interceptors/AuthenticationInterceptor';

const routes = [
  { path: 'animal-list', canActivate: [AuthGuardService], component: AnimalListComponent },
  { path: 'animal-store', canActivate: [AuthGuardService], component: AnimalStoreComponent },
  { path: 'add-animal', canActivate: [AuthGuardService], component: AddAnimalComponent },
  { path: 'add-food', canActivate: [AuthGuardService], component: AddFoodComponent },
  {
    path: 'animal-detail/:id', canActivate: [AuthGuardService], component: AnimalDetailComponent,
    resolve: { animal: AnimalResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AnimalComponent,
    AddAnimalComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    AnimalStoreComponent,
    AddFoodComponent],
  providers: [BaseUrlInterceptor,AuthenticationInterceptor, AnimalDataService, AnimalResolver]
})
export class AnimalModule { }
