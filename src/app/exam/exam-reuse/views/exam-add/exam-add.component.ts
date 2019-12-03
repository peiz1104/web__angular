import { ExamTargetResolveData, ExamTargetInfo } from './../../service/exam-reuse-target-resolver.service';
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
                // console.log(this.targetInfo, this.target, 44)
            }
        );
    }

    doSubmit(event) {
        this.submitLoading = true;
        let value = event.value;
        value['examType'] = 'EXAM';
        value['offeringId'] = this.target.id;
        value['examWh'] = this.targetInfo.type || this.target.type == 'TRAINING_CLASS' ? 'TRAININGCLASS' : this.target.type;
        value['examWhId'] = this.target.id;
        if (this.createOrEditor) {
            // event.value['userGroupId'] = this.router.snapshot.params.siteId && this.router.snapshot.params.siteId;
            this.examinationService.createNewExam(value).subscribe(
                obj => {
                    tipMessage('保存成功', 'success');
                    // this.location.back();
                    // this.router.navigate([`/training/class/${value['offeringId']}/exam`, obj]);
                    if (this.router.url.substring(0, 2).toString() == '/s') {
                        this.router.navigate([`/subject/activity/${value['offeringId']}/exam`, obj]);
                    } else {
                        this.router.navigate([`/training/class/assist/${value['offeringId']}/exam`, obj]);
                    }
                    this.submitLoading = false;
                },
                err => {
                    tipMessage(err);
                    this.submitLoading = false;
                }
            );
        } else {
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
