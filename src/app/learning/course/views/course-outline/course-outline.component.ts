import { Rco } from './../../entity/rco';
import { CourseOutlineService } from './../../service/course-outline.service';
import { RcoService } from './../../service/rco.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Course } from './../../entity/course';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './course-outline.component.html',
  styleUrls: ['./course-outline.component.scss']
})
export class CourseOutlineComponent implements OnInit {
  course: Course;
  msg: Message[];

  rcoIndex: Rco[];

  loading = true;
  // outline: Rco;

  constructor(private rcoService: RcoService, private outlineService: CourseOutlineService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {course: Course}) => {
      this.course = data.course;
      this.loadRcoIndex();
    });
  }

  loadRcoIndex() {
    if (!this.course) {
      return;
    }

    this.loading = true;
    this.outlineService.getOutlineIndex(this.course.id).subscribe(
      rcos => {
        this.rcoIndex = rcos;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  getRootRco() {
    return this.rcoIndex.find(it => !it.parent);
  }

  addTopicGroup() {
    let rco = this.getRootRco();

    let topic: Rco = new Rco();
    topic.depth = rco.depth + 1;
    topic.parent = rco;
    topic.rootRco = rco.rootRco;
    topic.contentType = 'TOPIC_GROUP';
    topic.trackingType = 'AUTO';

    this.rcoIndex.push(topic);
  }

  addTopic() {
    let rco = this.getRootRco();
    let topic: Rco = new Rco();
    topic.depth = rco.depth + 1;
    topic.parent = rco;
    topic.rootRco = rco.rootRco;
    topic.contentType = 'TOPIC';
    topic.trackingType = 'AUTO';

    this.rcoIndex.push(topic);
  }

  getOutline(parent?: Rco) {
    if (!parent) {
      let rootRco = this.rcoIndex.find(it => !it.parent);
      if (rootRco) {
        this.getOutline(rootRco);
      }
      return rootRco;
    } else {
      parent.children = this.rcoIndex.filter(it => it.parent && it.parent.id == parent.id)
        .sort((a: Rco, b: Rco) => a.childSeq - b.childSeq);

      if (parent.children) {
        parent.children.forEach(it => this.getOutline(it));
      }
    }
  }
}
