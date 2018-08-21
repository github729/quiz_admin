import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: any;
  constructor(private _courseApi: CourseService,
    private toastr: ToastsManager) {
    this._courseApi.getCourses$().subscribe(data => {
      if (data.success) {
        this.courses = data.courses;
        console.log(this.courses)
      } else { }
    });
  }

  ngOnInit() {
  }
  deleteCourse(id: number, index) {
    var delmsg = confirm("Are u Sure Want to delete?");
    if (delmsg) {
      let apiEvent = this._courseApi.deleteCourseById$(id)
        .subscribe(data => {
          if (data.success) {
            this.courses.splice(index, 1);
            this.toastr.success(data.message, 'Success');
          } else {
            this.toastr.error(data.message, 'Invalid');
          }
        }, err => {
          this.toastr.error(err.message, 'Error');
        });
    }
  }
}
