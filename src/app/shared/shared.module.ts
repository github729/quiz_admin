import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittingComponent } from '../models/submitting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  declarations: [
    SubmittingComponent
  ],
  exports: [
    SubmittingComponent,
    ReactiveFormsModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
