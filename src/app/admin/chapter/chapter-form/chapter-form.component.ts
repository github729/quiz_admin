import { Component, OnInit, Input } from '@angular/core';
import { ChapterFormModel, ChapterModel } from '../../../models/chapter.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChapterService } from '../../../services/chapter.service';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnInit {
  @Input() event: ChapterModel;
  chapterForm: FormGroup;
  submitBtnText: string;
  isEdit: boolean;
  formEvent: ChapterFormModel;
  submitting: boolean;
  submitEventObj: ChapterModel;
  submitEventSub: Subscription;
  error: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _courseApi: ChapterService,
    private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();
  }

  private _buildForm() {
    this.chapterForm = this.fb.group({
      courseId: [this.formEvent.courseId, Validators.required],
      name: [this.formEvent.name, Validators.required],
      description: [this.formEvent.description, Validators.required],
      status: [this.formEvent.status, Validators.required],
      total_qns: [this.formEvent.total_qns, Validators.required],
      duration: [this.formEvent.duration, Validators.required]
    });
  }
  
  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new ChapterFormModel(null, null, null,null,null,null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new ChapterFormModel(
        this.event.courseId,
        this.event.name,
        this.event.description,
        this.event.total_qns,
        this.event.duration,
        this.event.status
      );
    }
  }
  private _getSubmitObj() {
    return new ChapterModel(
      this.chapterForm.get('courseId').value,
      this.chapterForm.get('name').value,
      this.chapterForm.get('description').value,
      this.chapterForm.get('total_qns').value,
      this.chapterForm.get('duration').value,
      this.chapterForm.get('status').value,
      this.event ? this.event.id : null
    );
  }
  saveChapters() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();

    if (!this.isEdit) {
      this._courseApi.postEvent$(this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );

    } else {
      this._courseApi.editEvent$(this.event.id, this.submitEventObj)
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
      this.router.navigate(['/admin/chapter']);
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }

  }

  private _handleSubmitError(err) {
    this.toastr.error(err.message,'Error');
    this.submitting = false;
    this.error = true;
  }

}
