import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    private landingPageService: LandingPageService,
    private route: Router,
  ){
    this.landingPageService.spinnerAnimate(true)
  }

  ngOnInit(): void {
    this.landingPageService.spinnerAnimate(true)
  }

  ngOnDestroy(){
    this.landingPageService.spinnerAnimate(false)
  }
}
