import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {EditPageComponent} from './edit.page.component';

@NgModule({
  declarations: [
    EditPageComponent,
  ],
  imports: [
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: EditPageComponent}
    ])
  ],
  exports: [
    RouterModule
  ]

})
export class EditPageModule { }