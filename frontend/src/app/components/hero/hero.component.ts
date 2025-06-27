import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";

declare var AOS: any;

@Component({
  selector: 'app-hero',
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  ngOnInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom'
    });
  }
  
  refreshAnimations() {
    AOS.refresh();
  }

}
