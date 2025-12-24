import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StudioComponent } from './pages/studio/studio';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'studio', component: StudioComponent }
];
