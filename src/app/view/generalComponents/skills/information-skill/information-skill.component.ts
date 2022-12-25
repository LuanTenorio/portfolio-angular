import { Component, OnInit, Inject, Injector, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Skill } from 'src/app/model/skill.model';
import { ImageComponent } from 'src/app/view/generalComponents/image/image.component';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { ComfirmComponent } from '../../comfirm/comfirm.component';

@Component({
  selector: 'app-information-skill',
  templateUrl: './information-skill.component.html',
  styleUrls: ['./information-skill.component.css']
})
export class InformationSkillComponent implements OnInit {

  @ViewChild('paragraph') paragraph?: HTMLParagraphElement

  editable = false;
  skill!: Skill
  painelControlService?: PainelControlService

  constructor(
    public dialogRef: MatDialogRef<InformationSkillComponent>,
    private dialog: MatDialog,
    private injector: Injector,
    private landingPageService: LandingPageService,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: {skill: Skill, editable: boolean},
  ) {
    this.skill = this.data.skill
    if(this.data.editable !== undefined)
      this.editable = this.data.editable
  }

  @ViewChild('text') text!:ElementRef;

  ngAfterViewInit() {
    if(!this.editable)
      this.text.nativeElement.innerHTML += this.skill.description
  }

  ngOnInit(): void {
    if(this.editable)
      this.painelControlService = <PainelControlService>this.injector.get(PainelControlService);
  }

  close = () => this.dialogRef.close()

  openCertificate(certificatePath: string){
    this.dialog.open(ImageComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
      disableClose: true,
      data: certificatePath
    })
  }

  updateSkill(event: any, key: keyof Skill, skillId: number){
    if(!this.editable || this.painelControlService == undefined || this.landingPageService.skills == undefined)
      return

    let elementValue = event.target.textContent || ''
    let object = {[key]: elementValue}

    const comparationElement = this.skill![key] as string || ''

    if(key !== 'certificate' && key !== 'img' && comparationElement.trim() == elementValue.trim())
      return

    if(key == 'certificate' || key == 'img'){
      const dataFile = event.target.files[0]

      if(dataFile.type.split('/')[0] !== 'image'){
        this.painelControlService.alert('Adicione Uma imagem')
        return
      }

      const cover = new FormData()
      cover.append(key, dataFile, dataFile.name)
      object = cover
    }

    this.painelControlService.updateSkill(object, skillId).subscribe(
      skill => {
        const index = this.landingPageService.skills?.findIndex(curSkill => curSkill.id == skill.id)
        if(index !== undefined){
          this.landingPageService.skills![index] = skill
          this.skill = skill
        }
      },
      error => this.painelControlService!.alert('Erro ao alterar competencia')
    )
  }

  forInputCertificate = (input: HTMLInputElement) => input.click()

  deleteSkill(){
    if(!this.editable || this.painelControlService == undefined || this.landingPageService.skills == undefined)
      return

    const dialogRef = this.dialog.open(ComfirmComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
      data: 'Deletar Competencia?'
    })

    dialogRef.afterClosed().subscribe((isProceed: boolean) => {
      if(!isProceed)
        return

      this.landingPageService.spinnerAnimate(true)
      this.painelControlService?.deleteSkill(this.skill.id).subscribe(
        next => {
          const index = this.landingPageService.skills?.findIndex(skill => skill.id == this.skill.id)
          if(index !== undefined)
            this.landingPageService.skills?.splice(index, 1)

          this.landingPageService.spinnerAnimate(false)
          this.dialogRef.close()
        },
        error => {
          this.landingPageService.spinnerAnimate(false)
          this.dialogRef.close()
          this.painelControlService?.alert('Erro ao deletar competencia')
        }
      )
    })
  }

}
