import { Component, OnInit, Input, Injector } from '@angular/core';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { InformationSkillComponent } from 'src/app/view/generalComponents/skills/information-skill/information-skill.component';
import { AddSkillComponent } from 'src/app/view/generalComponents/skills/add-skill/add-skill.component';
import { Skill } from 'src/app/model/skill.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills?: Skill[]
  @Input() public editable = false;
  painelControlService?: PainelControlService
  isChangeOrder = false
  skillWasModified = false

  constructor(
    private landingPageService: LandingPageService,
    private dialog: MatDialog,
    private injector: Injector
  ) {
    this.skills = landingPageService.skills

    // const dialogRef = this.dialog.open(InformationSkillComponent, {
    //   enterAnimationDuration: '0ms',
    //   exitAnimationDuration: '350ms',
    //   data: landingPageService.skills![0],
    // });
  }

  openSkill(skillId: number){
    const skill = this.skills?.find(skill => skill.id == skillId)
    if(skill == undefined)
      return

    const dialogRef = this.dialog.open(InformationSkillComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
      data: {
        skill,
        editable: this.editable
      },
    });
  }

  setChangeOrder(value: boolean){
    if(!this.editable)
      return

    this.isChangeOrder = value

    if(this.isChangeOrder || !this.editable || this.painelControlService == undefined || !this.skillWasModified)
      return

    this.skillWasModified = false

    let i = 0;
    this.skills?.map(skill => {
      i++
      return skill.order = i
    })

    const skillOrderId: any = {}

    this.skills?.forEach(skill => skillOrderId['skill-' + skill.id] = skill.order)
    this.painelControlService.updateOrderSkills(skillOrderId).subscribe(
      data => {
        console.log(data);
      },
      error => this.painelControlService!.alert('Erro ao editar ordem das competencias')
    )
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
    this.skillWasModified = true
  }

  ngOnInit(): void {
    if(this.editable)
      this.painelControlService = <PainelControlService>this.injector.get(PainelControlService);
  }

  openAddSkill(){
    if(!this.editable || this.painelControlService == undefined)
      return

    this.dialog.open(AddSkillComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
    });
  }

}
