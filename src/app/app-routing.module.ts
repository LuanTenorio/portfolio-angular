import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { LoadingComponent } from './view/generalComponents/loading/loading.component';
import { ControlPanelComponent } from './view/control-panel/control-panel.component';
import { UserAuthorizedService } from './service/user-authorized.service';
import { LoginComponent } from './view/login/login.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'painel', canActivate: [UserAuthorizedService], component: ControlPanelComponent},
  {path: 'login', component: LoginComponent},

  {path: 'carregamento', component: LoadingComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
