import { Component, OnInit } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';

@Component({
  selector: 'spk-home-template-column-allcourse',
  templateUrl: './home-template-column-allcourse.component.html',
  styleUrls: ['./home-template-column-allcourse.component.scss']
})
export class HomeTemplateColumnAllcourseComponent implements OnInit {
  courseTree: any[] = [];
  constructor(
    private templateApiService: HomeTemplateApiService
  ) { }

  ngOnInit() {
    this.templateApiService.getCourseTree('course').subscribe(
      data => {
        this.courseTree = data;
      }
    )
  }

}
