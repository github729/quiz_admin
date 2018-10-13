import { Component, OnInit, Input } from '@angular/core';
import { JobsModel, JobsFormModel } from '../../../models/jobs.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JobsService } from '../../../services/jobs.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css']
})
export class JobsFormComponent implements OnInit {

  @Input() event: JobsModel;
  jobsForm: FormGroup;
  submitBtnText: string;
  isEdit: boolean;
  formEvent: JobsFormModel;
  submitting: boolean;
  submitEventObj: JobsModel;
  submitEventSub: Subscription;
  error: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _jobsApi: JobsService,
    private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();
  }

  private _buildForm() {
    this.jobsForm = this.fb.group({
      jtiltle: [this.formEvent.jtiltle, Validators.required],
      jpostdate: [this.formEvent.jpostdate, Validators.required],
      jcname: [this.formEvent.jcname, Validators.required],
      jlocation: [this.formEvent.jlocation, Validators.required],
      jrole: [this.formEvent.jrole, Validators.required],
      jeligibility: [this.formEvent.jeligibility, Validators.required],
      jlastdate: [this.formEvent.jlastdate, Validators.required],
      cwebsite: [this.formEvent.cwebsite, Validators.required],
      jexp: [this.formEvent.jexp, Validators.required],
      jcprofile: [this.formEvent.jcprofile, Validators.required],
      jdescription: [this.formEvent.jdescription, Validators.required],
      candidateprofile: [this.formEvent.candidateprofile, Validators.required],
      requiredskills: [this.formEvent.requiredskills, Validators.required],
      jurl: [this.formEvent.jurl, Validators.required],
      jclogo: [this.formEvent.jclogo, Validators.required]
    });
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new JobsFormModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new JobsFormModel(
        this.event.jtiltle,
        this.event.jpostdate,
        this.event.jcname,
        this.event.jlocation,
        this.event.jrole,
        this.event.jeligibility,
        this.event.jlastdate,
        this.event.cwebsite,
        this.event.jexp,
        this.event.jcprofile,
        this.event.jdescription,
        this.event.candidateprofile,
        this.event.requiredskills,
        this.event.jurl,
        this.event.jclogo
      );
    }
  }
  private _getSubmitObj() {
    return new JobsModel(
      this.jobsForm.get('jtiltle').value,
      this.jobsForm.get('jpostdate').value,
      this.jobsForm.get('jcname').value,
      this.jobsForm.get('jlocation').value,
      this.jobsForm.get('jrole').value,
      this.jobsForm.get('jeligibility').value,
      this.jobsForm.get('jlastdate').value,
      this.jobsForm.get('cwebsite').value,
      this.jobsForm.get('jexp').value,
      this.jobsForm.get('jcprofile').value,
      this.jobsForm.get('jdescription').value,
      this.jobsForm.get('candidateprofile').value,
      this.jobsForm.get('requiredskills').value,
      this.jobsForm.get('jurl').value,
      this.jobsForm.get('jclogo').value,
      this.event ? this.event.id : null
    );
  }
  saveJobs() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();

    if (!this.isEdit) {
      this._jobsApi.postEvent$(this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );

    } else {
      this._jobsApi.editEvent$(this.event.id, this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      this.router.navigate(['/admin/course']);
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }

  }

  private _handleSubmitError(err) {
    this.toastr.error(err.message, 'Error');
    this.submitting = false;
    this.error = true;
  }

}
