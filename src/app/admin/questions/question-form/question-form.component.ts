import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel, QuestionFormModel } from '../../../models/question.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @Input() event: QuestionModel;
  questionForm: FormGroup;
  submitBtnText: string;
  isEdit: boolean;
  formEvent: QuestionFormModel;
  submitting: boolean;
  submitEventObj: QuestionModel;
  submitEventSub: Subscription;
  error: boolean;
  chapterName: any;
  chapterId: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _questionApi: QuestionService,
    private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.chapterName = params['chapterName'];
        this.chapterId = params['chapterId'];
      });
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();
  }

  private _buildForm() {
    this.questionForm = this.fb.group({
      name: [this.formEvent.name, Validators.required],
      option1: [this.formEvent.option1, Validators.required],
      option2: [this.formEvent.option2, Validators.required],
      option3: [this.formEvent.option3, Validators.required],
      option4: [this.formEvent.option4, Validators.required],
      answers: [[this.formEvent.answers], Validators.required]
    });
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new QuestionFormModel(null, null, null, null, null, null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new QuestionFormModel(
        this.event.name,
        this.event.option1,
        this.event.option2,
        this.event.option3,
        this.event.option4,
        this.event.answers
      );
    }
  }
  private _getSubmitObj() {
    return new QuestionModel(
      this.questionForm.get('name').value,
      this.questionForm.get('option1').value,
      this.questionForm.get('option2').value,
      this.questionForm.get('option3').value,
      this.questionForm.get('option4').value,
      this.questionForm.get('answers').value,
      this.chapterId,
      this.event ? this.event.id : null
    );
  }
  saveQuestions() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    console.log(this.submitEventObj)
    // if (!this.isEdit) {
    //   this._questionApi.postEvent$(this.submitEventObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );

    // } else {
    //   this._questionApi.editEvent$(this.event.id, this.submitEventObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // }
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      // this.router.navigate(['/admin/course/view',this.courseId]);
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
