import { Component, OnInit, Inject } from '@angular/core';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { LandingPageService } from 'src/app/service/landing-page.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from 'src/app/model/project.model';
import { ComfirmComponent } from '../../comfirm/comfirm.component';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css']
})
export class DetailsProjectComponent implements OnInit {

  project: Project
  editable: boolean
  isEditImages = false
  isChangeOrder = false
  imagesForDelete: number[] = []
  newImages: File[] = []
  isChangeOrderImage = false

  constructor(
    private dialogRef: MatDialogRef<DetailsProjectComponent>,
    private painelControlService: PainelControlService,
    private dialog: MatDialog,
    private landingPageService: LandingPageService,
    @Inject(MAT_DIALOG_DATA) public data: {project: Project, editable: boolean},
  ){
    this.project = data.project
    this.editable = data.editable
  }

  ngOnInit(): void {
  }

  moveCarrossel(avanced: boolean | null, amountCarrossel: number, carrossel: HTMLElement){
    if(avanced == null)
      return

    const imageWidth = avanced ? carrossel.offsetWidth : carrossel.offsetWidth * -1
    const imagesLast = Math.round(carrossel.scrollLeft / Math.abs(imageWidth))

    if((!avanced && imagesLast > 0) || (avanced && imagesLast + 1 < amountCarrossel))
      carrossel.scroll({left: carrossel.scrollLeft + imageWidth, behavior: 'smooth'})
  }

  goToLink = (url: string) => window.open(url, "_blank");

  close(){
    this.dialogRef.close()
  }

  dropImages(event: any){
    console.log('droppppppppppppppp');

    if(!this.editable || this.painelControlService == undefined)
      return

    event.preventDefault()
    const files: File[] = Object.values(event.dataTransfer.files)
    files.forEach(file => this.changedFile(file));
  }

  changedFile(file: any, isEvent: boolean = false){
    console.log(file);

    if(!this.editable || this.painelControlService == undefined)
      return

    if(isEvent)
      file = file.target.files[0]

    if(file.type.split('/')[0] !== 'image')
      this.painelControlService.alert('Adicione Um Arquivo Do Tipo Imagem')
    else{
      const reader = new FileReader()
      reader.onload = () => file.src = reader.result
      reader.readAsDataURL(file);
      this.newImages.push(file)
    }
    console.log(this.newImages);
  }

  addImage(input: HTMLInputElement){
    if(!this.editable || this.painelControlService == undefined)
      return

    input.click()
  }

  editImages(){
    if(!this.editable || this.painelControlService == undefined)
      return

    this.isEditImages = !this.isEditImages

    if(this.isEditImages)
      return

    const projectData = new FormData()

    if(this.imagesForDelete.length > 0)
      projectData.append('imagesForDelete', this.imagesForDelete.join(','))

    let i = 1
    this.newImages.forEach(image => {
      projectData.append(`image${i}`, image, image.name)
      i++
    })

    const orderImages = this.setChangeOrder()

    if(Object.keys(orderImages).length > 0)
      Object.keys(orderImages).forEach((key: string) => projectData.append(key, orderImages[key]))

    this.painelControlService.updateProject(projectData, this.project.id).subscribe(
      project => {
        const index = this.landingPageService.projects?.findIndex(curPorject => curPorject.id == project.id)
        if(index !== undefined){
          this.landingPageService.projects![index] = project
          this.project = project
        }
      },
      error => this.painelControlService.alert('Erro ao atualizar projeto')
    )

  }

  deleteImage(index: number){
    this.imagesForDelete.push(this.project.images[index].id)
    this.project.images.splice(index, 1)
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

    this.isChangeOrderImage = true
  }

  changeElement(event: any, key: keyof Project){
    if(!this.editable || this.painelControlService == undefined)
      return

    let elementValue = event.target.textContent
    let object = {[key]: elementValue}

    const comparationElement = this.project![key] as string

    if(comparationElement.trim() == elementValue.trim())
      return


    this.painelControlService.updateProject(object, this.project.id).subscribe(
      project => {
        const index = this.landingPageService.projects?.findIndex(curPorject => curPorject.id == project.id)
        if(index !== undefined){
          this.landingPageService.projects![index] = project
          this.project = project
        }
      },
      error => this.painelControlService.alert('Error ao atualizar projeto')
    )
  }

  deleteProject(){
    const dialogRef = this.dialog.open(ComfirmComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '350ms',
      data: 'Deletar Projeto?'
    })

    dialogRef.afterClosed().subscribe((isProceed: boolean) => {
      if(!isProceed)
        return

      this.landingPageService.spinnerAnimate(true)
      this.painelControlService.deleteProject(this.project.id).subscribe(
        next => {
          const index = this.landingPageService.projects?.findIndex(project => project.id == this.project.id)
          if(index !== undefined)
            this.landingPageService.projects?.splice(index, 1)

          this.landingPageService.spinnerAnimate(false)
          this.dialogRef.close()
        },
        error => {
          this.landingPageService.spinnerAnimate(false)
          this.dialogRef.close()
          this.painelControlService.alert('Erro ao deletar projeto')
        }
      )
    })
  }

  setChangeOrder(){
    if(!this.isChangeOrderImage)
      return {}

    let i = 0
    this.project.images.map(image => {
      i++
      return image.order = i
    })

    const imageOrderId: any = {}
    this.project.images.forEach(image => imageOrderId['image-' + image.id] = image.order)

    return imageOrderId
  }

}
