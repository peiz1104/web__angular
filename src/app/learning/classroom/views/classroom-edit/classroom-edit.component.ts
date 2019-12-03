import { ClassroomService } from './../../service/classroom.service';
import { Classroom } from './../../entity/classroom';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-edit',
    templateUrl: './classroom-edit.component.html',
    styleUrls: ['./classroom-edit.component.scss']
})
export class ClassroomEditComponent implements OnInit {
    classroom: Classroom;
    msg;
    loading: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private classroomService: ClassroomService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { classroom: Classroom }) => {
            this.classroom = data.classroom;
        });
    }

    doSubmit(event) {
        this.loading = true;
        this.classroomService.save(event.value).subscribe(
            classroom => {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
                this.classroom = classroom;
            },
            err => {
                this.loading = false;
                tipMessage('保存失败');
            }
        );
    }
}
