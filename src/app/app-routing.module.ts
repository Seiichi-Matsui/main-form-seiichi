import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { FormAreaModule } from './form-area/form-area.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormAreaModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
