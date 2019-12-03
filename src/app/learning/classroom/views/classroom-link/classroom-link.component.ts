import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClassroomService } from './../../service/classroom.service';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-link',
    templateUrl: './classroom-link.component.html',
    styleUrls: ['./classroom-link.component.scss']
})
export class ClassroomLinkComponent implements OnInit {

    classroom: Classroom;
    loading: boolean = false;
    constructor(private classroomService: ClassroomService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.classroom = new Classroom();
    }

    doSubmit(event) {
        this.loading = true;
        this.classroomService.save(event.value).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.router.navigate(['../', ok.id], { relativeTo: this.route });
                // this.loading = false;
            },
            err => {
                tipMessage('保存失败');
                this.loading = false;
            }
        );
    }

}
