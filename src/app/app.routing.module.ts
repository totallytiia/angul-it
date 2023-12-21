import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptchaComponent } from './captcha/captcha.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { WrongComponent } from './wrong/wrong.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'result', component: ResultComponent },
  { path: 'wrong', component: WrongComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
