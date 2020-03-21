import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FilterPipe
  ]
})
export class SharedModule { }
