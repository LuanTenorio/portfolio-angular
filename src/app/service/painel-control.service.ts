import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Info } from 'src/app/model/info.model';
import { Project } from 'src/app/model/project.model';
import { Skill } from 'src/app/model/skill.model';
import { AlertService } from 'src/app/service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PainelControlService {

  // API = 'http://localhost:8000/api/'
  API = 'api/'
  loadedToken = false

  constructor(
    private http: HttpClient,
    private route: Router,
    private alertService: AlertService,
  ) {}

  alert = (text: string) => this.alertService.addAlert(text)

  spinnerAnimate(show: boolean){
    const spinner = document.getElementById('spinner')
    if(spinner == null)
      return

    spinner.style.display = show ? 'flex' : 'none'
    spinner.style.visibility = show ? 'visible' : 'hidden'
  }

  setHeaderRequest = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  updateInformations = (informations: any): Observable<Info> =>
    this.http.post<Info>(this.API + "infos", informations, this.setHeaderRequest)

  addSkill = (skill: any): Observable<Skill> =>
    this.http.post<Skill>(this.API + "skill", skill, this.setHeaderRequest)

  updateSkill = (skill: any, skillId: number): Observable<Skill> =>
    this.http.post<Skill>(this.API + "edit/skill/" + skillId, skill, this.setHeaderRequest)

  updateOrderSkills = (skillsIdOrder: any): Observable<Skill> =>
    this.http.post<Skill>(this.API + "edit/order/skill/", skillsIdOrder, this.setHeaderRequest)

  deleteSkill = (skillId: number): Observable<String> =>
    this.http.delete<String>(this.API + "delete/skill/" + skillId, this.setHeaderRequest)

  addProject = (project: any): Observable<Project> =>
    this.http.post<Project>(this.API + "project", project, this.setHeaderRequest)

  updateProject = (project: any, projectId: number): Observable<Project> =>
    this.http.post<Project>(this.API + "edit/project/" + projectId, project, this.setHeaderRequest)

  updateOrderProject = (project: any): Observable<Project> =>
    this.http.post<Project>(this.API + "edit/order/project", project, this.setHeaderRequest)

  deleteProject = (projectId: number): Observable<String> =>
    this.http.delete<String>(this.API + "delete/project/" + projectId, this.setHeaderRequest)

  changeUserInfo = (userInfo: any): Observable<String> =>
    this.http.post<any>(this.API + "edit/userInfo", userInfo, this.setHeaderRequest)
}
