import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ReposteriaComponent } from './components/reposteria/reposteria.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path: 'home',component:HomeComponent},
    {path: 'admin',component:AdminPanelComponent},
    {path: 'reposteria',component:ReposteriaComponent},
    {path: 'carts',component:CartComponent},
];
