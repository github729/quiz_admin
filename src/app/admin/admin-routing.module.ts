import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ChapterListComponent } from './chapter/chapter-list/chapter-list.component';
import { CreateChapterComponent } from './chapter/create-chapter/create-chapter.component';
import { UpdateChapterComponent } from './chapter/update-chapter/update-chapter.component';
import { ChapterViewComponent } from './chapter/chapter-view/chapter-view.component';

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
              path: 'update/:id', component: UpdateCourseComponent
            },
            {
              path: 'view/:id', component: CourseViewComponent
            }
          ]
        },
        {
          path: 'chapter', component: ChapterComponent,
          children: [
            {
              path: '', component: ChapterListComponent
            },
            {
              path: 'create', component: CreateChapterComponent
            },
            {
              path: 'update/:id', component: UpdateChapterComponent
            },
            {
              path: 'view/:id', component: ChapterViewComponent
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
