import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationService } from '../../service/examination.service';
import { Examination } from '../../entity/examination';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-exam-add',
    templateUrl: './exam-add.component.html',
    styleUrls: ['./exam-add.component.scss']
})
export class ExamAddComponent implements OnInit {
    examDetail: Examination = new Examination();
    createOrEditor: boolean = true;
    submitLoading: boolean;

    constructor(
        private router: ActivatedRoute,
        private examinationService: ExaminationService,
        private location: Location,
        private route: Router
    ) { }

    ngOnInit() {
        this.router.params.subscribe(
            data => {
                this.examDetail.userGroupId = data.siteId;
                this.examDetail.userGroupName = data.name;

            }
        )
        this.router.data.subscribe(
            (data: { examination: any }) => {
                if (data.examination) {
                    this.createOrEditor = false;
                    this.examDetail = data.examination;
                } else {
                    this.createOrEditor = true;
                }
            }
        );
    }
    doSubmit(event) {
        this.submitLoading = true;
        if (this.createOrEditor) {
            console.log('event.value', event.value)
            // event.value['userGroupId'] = this.router.snapshot.params.siteId && this.router.snapshot.params.siteId;
            this.examinationService.createNewExam(event.value).subscribe(
                obj => {
                    tipMessage('保存成功', 'success');
                    console.log(obj);
                    // this.location.back();
                    this.route.navigate(['/exam/examination-learning/editForLearning', obj])
                    this.submitLoading = false;
                },
                err => {
                    tipMessage(err);
                    this.submitLoading = false;
                }
            );
        } else {
            console.log('this.examDetail[id]', this.examDetail['examId'])
            this.examinationService.updateExam(this.examDetail['examId'], event.value).subscribe(
                obj => {
                    tipMessage('更新考试成功', 'success');
                    this.submitLoading = false;
                },
                err => {
                    tipMessage(err);
                    this.submitLoading = false;
                }
            );
        }
    }

    onCancel(e) {
        // this.toList();
    }

    toList() {
        // this.router.navigate(['../'], {relativeTo: this.route});
    }
}
