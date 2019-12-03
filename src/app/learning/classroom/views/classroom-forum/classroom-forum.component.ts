import { Column } from 'console-ui-ng';
import { Classroom } from './../../entity/classroom';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../service/classroom.service';
import { Forum } from '../../../../forum/ordinary-forum/entity/forum';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-forum',
    templateUrl: './classroom-forum.component.html',
    styleUrls: ['./classroom-forum.component.scss']
})
export class ClassroomForumComponent implements OnInit {

    classroom: Classroom;

    forum: Forum;

    boards: any = [];
    loading: boolean = true;
    columns: Column[] = [
        { title: '名称', data: '' },
        { title: '操作', data: '', styleClass: 'text-right' },
    ];

    constructor(
        private route: ActivatedRoute,
        private classService: ClassroomService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { classroom: Classroom }) => {
            this.classroom = data.classroom;
        });
        this.initCondition();
    }

    initCondition() {
        this.classService.getForum(this.classroom.id).subscribe(
            ok => {
                this.forum = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

}
