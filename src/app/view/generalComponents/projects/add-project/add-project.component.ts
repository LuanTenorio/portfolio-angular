import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  form!: FormGroup
  images: File[] | any[] = []
  isDragover = false

  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private formBilder: FormBuilder,
    private painelControlService: PainelControlService,
    private landingPageService: LandingPageService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBilder.group({
      link: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  isDragoverImages = (isDragover: boolean) => this.isDragover = true

  dropImages(event: any){
    event.preventDefault()
    const files: File[] = Object.values(event.dataTransfer.files)
    files.forEach(file => this.changedFile(file));
    console.log(this.images);
  }

  changedFile(file: any, isEvent: boolean = false){
    console.log('change file');

    if(isEvent)
      file = file.target.files[0]

    if(file.type.split('/')[0] !== 'image')
      this.painelControlService.alert('Adicione Um Arquivo Do Tipo Imagem')
    else{
      const reader = new FileReader()
      reader.onload = () => file.src = reader.result
      reader.readAsDataURL(file);
      this.images.push(file)
    }
  }

  deleteImage = (index: number) => this.images.splice(index, 1)

  close(send: boolean){
    if(!send){
      this.dialogRef.close()
      return
    }

    if(!this.form.valid || this.images == undefined  || this.images.length == 0){
      this.painelControlService.alert('Prencha os campos necessarios')
      return
    }

    const projectData = new FormData()
    projectData.append('link', this.form.value.link)
    projectData.append('description', this.form.value.description)

    let i = 1
    this.images.forEach(image => {
      projectData.append(`image${i}`, image, image.name)
      i++
    })

    this.landingPageService.spinnerAnimate(true)
    this.painelControlService.addProject(projectData).subscribe(
      project => {
        this.landingPageService.projects?.push(project)
        this.landingPageService.spinnerAnimate(false)
        this.dialogRef.close()
      }, error => {
        this.landingPageService.spinnerAnimate(false)
        this.painelControlService.alert('Erro ao adicionar projeto')
      }
    )
  }

}
