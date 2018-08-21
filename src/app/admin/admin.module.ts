import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    CoursesComponent,
    CreateCourseComponent,
    UpdateCourseComponent,
    CourseFormComponent,
    CoursesListComponent
  ]
})
export class AdminModule { }
