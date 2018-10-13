import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng6-toastr';
import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  public data: any = [];
  public rowsOnPage : number = 10;

  constructor(private _jobsApi: JobsService,
    private toastr: ToastsManager) {
    
  }

  ngOnInit() {
    this._jobsApi.getJobs$().subscribe(data => {
      if (data.success) {
        this.data = data.jobs;
        console.log(this.data)
      } else { }
    });
  }
  deleteJob(id: number, index) {
    var delmsg = confirm("Are u Sure Want to delete?");
    if (delmsg) {
      let apiEvent = this._jobsApi.deleteJobById$(id)
        .subscribe(data => {
          if (data.success) {
            this.data.splice(index, 1);
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
