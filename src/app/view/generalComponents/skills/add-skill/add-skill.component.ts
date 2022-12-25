import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/model/skill.model';


@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  form!: FormGroup
  skillImg?: File
  skillCertificate?: File

  constructor(
    public dialogRef: MatDialogRef<AddSkillComponent>,
    private formBilder: FormBuilder,
    private painelControlService: PainelControlService,
    private landingPageService: LandingPageService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBilder.group({
      name: ['', [Validators.required]],
      skill_link: [''],
      description: ['', [Validators.required]],
    })
  }

  changedFile(event: any, fileName: 'img' | 'certificate'){
    const dataFile = event.target.files[0]
    if(dataFile.type.split('/')[0] !== 'image'){
      this.painelControlService.alert('Adicione Um Arquivo Do Tipo Imagem')
      return
    }
    console.log(dataFile);


    if(fileName == 'img')
      this.skillImg = dataFile
    else
      this.skillCertificate = dataFile
  }

  close(send: boolean){
    if(!send){
      this.dialogRef.close()
      return
    }

    if(!this.form.valid){
      this.painelControlService.alert('Preencha os campos necessarios')
      return
    }

    const skillData = new FormData()
    skillData.append('name', this.form.value.name)
    skillData.append('description', this.form.value.description)

    if(this.form.value.skill_link !== '')
      skillData.append('skill_link', this.form.value.skill_link)

    if(this.skillImg !== undefined)
      skillData.append('img', this.skillImg, this.skillImg.name)

    if(this.skillCertificate !== undefined)
      skillData.append('certificate', this.skillCertificate, this.skillCertificate.name)

    this.painelControlService.spinnerAnimate(true)
    this.painelControlService.addSkill(skillData).subscribe(
      skill => {
        this.landingPageService.skills?.push(skill)
        this.painelControlService.spinnerAnimate(false)
        this.dialogRef.close()
      },
      error => {
        this.painelControlService.alert('Erro ao adicionar competencia');
        this.painelControlService.spinnerAnimate(false)
        this.dialogRef.close()
      }
    )


  }

}
