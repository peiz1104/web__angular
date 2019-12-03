import { ExamTargetResolveData, ExamTargetInfo } from './../../service/exam-reuse-target-resolver.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationService } from '../../service/examination.service';
import { Examination } from '../../entity/examination';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-exam-edit',
    templateUrl: './exam-edit.component.html',
    styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
    examDetail: Examination = new Examination();
    createOrEditor: boolean = true;
    submitLoading: boolean;

    targetInfo: ExamTargetResolveData;
    target: ExamTargetInfo;

    constructor(
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private location: Location,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ({ examination, targetInfo }: { examination: any, targetInfo: ExamTargetResolveData }) => {
                if (examination) {
                    this.createOrEditor = false;
                    this.examDetail = examination;
                } else {
                    this.examDetail.userGroupId = targetInfo.target.userGroupId;
                    this.examDetail.userGroupName = targetInfo.target.userGroupName;
                    this.createOrEditor = true;
                }
                this.targetInfo = targetInfo;
                this.target = targetInfo.target;
            }
        );
    }

    doSubmit(event) {
        this.submitLoading = true;
        let value = event.value;
        if (this.targetInfo.type == 'OFFERING') {
            value['examType'] = 'EXAM';
            value['offeringId'] = this.target.id;
            value['examWh'] = 'COURSE';
            value['examWhId'] = this.target.id;
        }
        if (this.createOrEditor) {
            console.log('event.value', event.value)
            // event.value['userGroupId'] = this.router.snapshot.params.siteId && this.router.snapshot.params.siteId;
            this.examinationService.createNewExam(value).subscribe(
                obj => {
                    tipMessage('保存成功', 'success');
                    console.log(obj);
                    // this.location.back();
                    // this.router.navigate(['/exam/examination-learning/editForLearning', obj])
                    this.submitLoading = false;
                },
                err => {
                    tipMessage(err);
                    this.submitLoading = false;
                }
            );
        } else {
            console.log('this.examDetail[id]', this.examDetail['examId'])
            this.examinationService.updateExam(this.examDetail['examId'], value).subscribe(
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
    }
}
