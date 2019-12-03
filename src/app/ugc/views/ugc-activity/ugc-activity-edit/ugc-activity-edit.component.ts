import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcActivityService } from './../../../service/ugc-activity.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormDataUtil } from 'app/core';
import { UgcActivity } from '../../../entity/ugc-activity';

@Component({
    selector: 'spk-ugc-activity-edit',
    templateUrl: './ugc-activity-edit.component.html',
    styleUrls: ['./ugc-activity-edit.component.scss']
})
export class UgcActivityEditComponent implements OnInit {

    loading;
    ugcActivity: UgcActivity;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugcActivityService: UgcActivityService,
        private message: NzMessageService,
    ) {

    }

    ngOnInit() {
        this.route.data.subscribe(
            (obj: { ugcActivity: UgcActivity }) => {
                this.ugcActivity = obj.ugcActivity
            }
        );
    }
    onSave(event) {
        let value = event.value;
        this.loading = true;
        value.id = '' + this.ugcActivity.id;
        this.ugcActivityService.save(value).subscribe(
            ok => {
                this.message.success('修改活动成功');
                this.loading = false;
                this.router.navigate(['.'], {relativeTo: this.route, queryParams: {t: Math.random()}});
                // this.toList();
            },
            err => {
                this.message.error(`修改活动失败`);
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
}
