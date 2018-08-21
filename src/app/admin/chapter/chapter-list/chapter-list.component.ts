import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../../services/chapter.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  public data: any = [];
  public rowsOnPage : number = 2;
  constructor(private _chapterApi: ChapterService,
    private toastr: ToastsManager) {
    
  }

  ngOnInit() {
    this._chapterApi.getChapters$().subscribe(data => {
      if (data.success) {
        this.data = data.chapters;
        console.log(this.data)
      } else { }
    });
  }
  deleteChapter(id: number, index) {
    var delmsg = confirm("Are u Sure Want to delete?");
    if (delmsg) {
      let apiEvent = this._chapterApi.deleteChapterById$(id)
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
