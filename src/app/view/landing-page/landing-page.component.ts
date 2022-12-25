import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private landingPageService: LandingPageService,
    private route: Router,
  ) {

   }

  ngOnInit(): void {
    this.landingPageService.spinnerAnimate(false)
  }

  changeScroll(elementNumber: number){
    const elementsForScroll = document.querySelectorAll(`.page-scroll`)
    if((elementNumber + 1) > elementsForScroll.length)
      return

    const element = elementsForScroll[elementNumber] as HTMLElement
    const scrollY = element.offsetTop

    window.scroll({top: scrollY, behavior: 'smooth'})
  }

}
