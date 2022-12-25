import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { Info } from 'src/app/model/info.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  infos?: Info

  constructor(private landingPageService: LandingPageService) {
    this.infos = landingPageService.infos
  }

  ngOnInit(): void {
  }

}
