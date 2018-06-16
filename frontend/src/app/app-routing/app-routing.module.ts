import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { NotfoundComponent } from '../notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: 'animal',

    loadChildren: 'app/animal/animal.module#AnimalModule'
  },
  { path: '', redirectTo: '/animal-list', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
