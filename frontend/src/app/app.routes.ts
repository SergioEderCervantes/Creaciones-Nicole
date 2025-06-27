import { Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
    
    { path: '', component: HomeComponent },
    {path: 'admin',component:AdminPanelComponent},
];