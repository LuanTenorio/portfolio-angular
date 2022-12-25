import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { HeaderComponent } from './view/generalComponents/header/header.component';
import { FooterComponent } from './view/generalComponents/footer/footer.component';
import { SkillsComponent } from './view/generalComponents/skills/skills.component';
import { ProjectsComponent } from './view/generalComponents/projects/projects.component';
import { InformationsComponent } from './view/generalComponents/informations/informations.component';
import { LoadingComponent } from './view/generalComponents/loading/loading.component';
import { ControlPanelComponent } from './view/control-panel/control-panel.component';

import { LandingPageService } from './service/landing-page.service';
import { AlertService } from './service/alert.service';
import { InformationSkillComponent } from './view/generalComponents/skills/information-skill/information-skill.component';
import { AddSkillComponent } from './view/generalComponents/skills/add-skill/add-skill.component';
import { ComfirmComponent } from './view/generalComponents/comfirm/comfirm.component';
import { AddProjectComponent } from './view/generalComponents/projects/add-project/add-project.component';
import { DetailsProjectComponent } from './view/generalComponents/projects/details-project/details-project.component';
import { ImageComponent } from './view/generalComponents/image/image.component';
import { LoginComponent } from './view/login/login.component';
import { ChangeUserInfoComponent } from './view/generalComponents/change-user-info/change-user-info.component';
import { AlertComponent } from './view/generalComponents/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    SkillsComponent,
    ProjectsComponent,
    InformationsComponent,
    LoadingComponent,
    InformationSkillComponent,
    ControlPanelComponent,
    AddSkillComponent,
    ComfirmComponent,
    AddProjectComponent,
    DetailsProjectComponent,
    ImageComponent,
    LoginComponent,
    ChangeUserInfoComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    // LandingPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
