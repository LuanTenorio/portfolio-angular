import { Component, OnInit, Input, Injector } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { PainelControlService } from 'src/app/service/painel-control.service';
import { Info } from 'src/app/model/info.model';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  infos?: Info
  painelControlService?: PainelControlService
  @Input() public editable = false;

  constructor(
    private landingPageService: LandingPageService,
    private injector: Injector
  ) {
    this.infos = landingPageService.infos
  }

  ngOnInit(): void {
    if(this.editable)
      this.painelControlService = <PainelControlService>this.injector.get(PainelControlService);
  }

  getValueForEvent(event: any){
    const element = event.target
    const elementType = element.localName
    return elementType == 'p' ? element.textContent : element.value
  }

  changeElement(event: any, key: keyof Info){
    if(!this.editable || this.painelControlService == undefined)
      return

    let elementValue = this.getValueForEvent(event)
    let object = {[key]: elementValue}

    const comparationElement = this.infos![key] as string

    if(key !== 'cover' && comparationElement.trim() == elementValue.trim())
      return

    if(key == 'cover'){
      const dataFile = event.target.files[0]

      if(dataFile.type.split('/')[0] !== 'image'){
        this.painelControlService.alert('Adicione um arquivo do tipo imagem')
        return
      }

      const cover = new FormData()
      cover.append('cover', dataFile, dataFile.name)
      object = cover
    }

    this.painelControlService.updateInformations(object).subscribe(
      infos => this.landingPageService.infos = infos,
      error => this.painelControlService?.alert('Erro ao Editar informações')
    )
  }

}
