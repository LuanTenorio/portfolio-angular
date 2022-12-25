import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerOptions = ['Eu', 'Competencias', 'Projetos', 'Contato']
  scrollOpsions = ['infos', 'skills', 'projects', 'footer']
  @Output() changeScroll: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {

  }

  emitChangeScroll(elementNumber: number){
    this.changeScroll.emit(elementNumber)
  }


}
