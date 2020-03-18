import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {MainPageComponent} from './main-page/main.page.component';
import {ErrorPageComponent} from './error-page/error.page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'users', component: MainPageComponent},
  {path: 'users/:id', loadChildren: () => import('./edit-page/edit.page.module').then(m => m.EditPageModule)},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
