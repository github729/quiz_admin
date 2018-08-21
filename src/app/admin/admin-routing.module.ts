import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

const AdminRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:
      [
        {
          path: '', component: DashboardComponent
        },
        {
          path: 'course', component: CoursesComponent,
          children: [
            {
              path: '', component: CoursesListComponent
            },
            {
              path: 'create', component: CreateCourseComponent
            },
            {
              path: 'update', component: UpdateCourseComponent
            }
          ]
        }
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
