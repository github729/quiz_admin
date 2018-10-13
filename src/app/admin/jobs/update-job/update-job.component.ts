import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { JobsModel } from '../../../models/jobs.model';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {

  public job: JobsModel;
  private id: number;
  public loading: boolean;

  constructor(private _jobsApi: JobsService,
    private route: ActivatedRoute,
    private utils : UtilsService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loading = true;

    this._jobsApi.getJobById$(this.id)
      .subscribe(res => {
        if (res.success) {
          this.loading = false;
          this.job = res.job;
          console.log(this.job)
        }
      }, err => {
        this.loading = false;
        // this.error = true;
      });

  }

}
