import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [HeroComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

