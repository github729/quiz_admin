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
          this.question = res.question;
          console.log(this.question)
          this.options = res.question.question_answer;
          this.options.option1 =  res.question.question_options[0].option_text;
          this.options.option2 =  res.question.question_options[1].option_text;
          this.options.option3 =  res.question.question_options[2].option_text;
          this.options.option4 =  res.question.question_options[3].option_text;
          this.options.answer = res.question.question_answer.answer;
        }
      }, err => {
        this.loading = false;
        // this.error = true;
      });
  }
}
