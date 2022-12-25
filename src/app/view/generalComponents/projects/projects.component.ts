import { Component, OnInit, Input, Injector, ElementRef, ViewChild } from '@angular/core';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { AddProjectComponent } from 'src/app/view/generalComponents/projects/add-project/add-project.component';
import { DetailsProjectComponent } from 'src/app/view/generalComponents/projects/details-project/details-project.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  painelControlService?: PainelControlService
  @Input() public editable = false;
  isChangeOrder = false
  projectWasModified = false

  constructor(
    public landingPageService: LandingPageService,
    private dialog: MatDialog,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    if(this.editable)
      this.painelControlService = <PainelControlService>this.injector.get(PainelControlService);
  }

  goToLink = (url: string) => window.open(url, "_blank");

  openAddProject(){
    if(!this.editable || this.painelControlService == undefined)
      return

    const dialogRef = this.dialog.open(AddProjectComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
    });
  }

  openDetailsProject(project: Project){
    const dialogRef = this.dialog.open(DetailsProjectComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
      data: {project, editable: this.editable},
    });
  }

  moveCarrossel(avanced: boolean | null, amountCarrossel: number, carrossel: HTMLElement){
    if(avanced == null)
      return

    const imageWidth = avanced ? carrossel.offsetWidth : carrossel.offsetWidth * -1
    const imagesLast = Math.round(carrossel.scrollLeft / Math.abs(imageWidth))

    if((!avanced && imagesLast > 0) || (avanced && imagesLast + 1 < amountCarrossel))
      carrossel.scroll({left: carrossel.scrollLeft + imageWidth, behavior: 'smooth'})
  }

  drop(event: CdkDragDrop<string[]> | any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.projectWasModified = true
  }

  setChangeOrder(value: boolean){
    if(!this.editable)
      return

    this.isChangeOrder = value
    if(this.isChangeOrder || !this.editable || this.painelControlService == undefined || !this.projectWasModified)
      return

    this.projectWasModified = false

    let i = 0
    this.landingPageService.projects?.map(project => {
      i++
      return project.order = i
    })

    const projectOrderId: any = {}

    this.landingPageService.projects?.forEach(project => projectOrderId['project-' + project.id] = project.order)
    this.painelControlService.updateOrderProject(projectOrderId).subscribe(
      data => {},
      error => this.painelControlService!.alert('Erro ao editar ordem dos projetos')
    )
  }
}
