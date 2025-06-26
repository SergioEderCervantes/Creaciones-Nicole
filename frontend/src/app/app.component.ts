import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { ButtonModule } from 'primeng/button';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HomeComponent,RouterModule,HeroComponent, ButtonModule, AdminPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
