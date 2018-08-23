import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { QuestionModel, OptionsModel } from '../../../models/question.model';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  public question: QuestionModel;
  public options: OptionsModel;
  private id: number;
  public loading : boolean;
  constructor(private _qnsApi: QuestionService,
    private route: ActivatedRoute,
    private utils : UtilsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.loading = true;
    this._qnsApi.getQuestionById$(this.id)
      .subscribe(res => {
        if (res.success) {
          this.loading = false;
          console.log(res.question)
          this.question = res.question.question;
          this.options = res.question.question_options;
        }
      }, err => {
        this.loading = false;
        // this.error = true;
      });
  }
}
