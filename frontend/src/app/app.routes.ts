import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
    {path: 'home',component:HomeComponent},
    {path: 'admin',component:AdminPanelComponent},
];
