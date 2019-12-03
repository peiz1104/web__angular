import { Forum } from './entity/forum';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-ordinary-forum',
  templateUrl: './ordinary-forum.component.html',
  styleUrls: ['./ordinary-forum.component.scss']
})
export class OrdinaryForumComponent implements OnInit {

  forum: Forum;
  boardId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { forum: Forum }) => {
      this.forum = data.forum;
    });
  }
}
