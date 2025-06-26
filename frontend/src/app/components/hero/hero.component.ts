import { Component,OnInit } from '@angular/core';

declare var AOS: any;

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  ngOnInit() {
    // Inicializar AOS
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
