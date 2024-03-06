import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptchaComponent } from './captcha/captcha.component';
import { stateGuard } from './guards/state.guard';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { WrongComponent } from './wrong/wrong.component';

// Define the routes for the application
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'result', component: ResultComponent, canActivate: [stateGuard] },
  { path: 'wrong', component: WrongComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

// Define the routing module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
