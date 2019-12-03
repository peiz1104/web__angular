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
    courseOfferingId: any;// 活动id  课程考试记录培训班活动id
    offeringId: any;
    targetInfo: ExamTargetResolveData;
    target: ExamTargetInfo;

    constructor(
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private location: Location,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(obj => {
            this.courseOfferingId = obj.courseId;
            this.offeringId = obj.tbcId;
        });
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
        if (this.targetInfo.type == 'COURSE') {
            value['examType'] = 'EXAM';
            value['offeringId'] = '';
            value['examWh'] = 'COURSE';
            value['examWhId'] = this.target.id;
            value['courseOfferingId'] = this.courseOfferingId;
        }
        if (this.createOrEditor) {
            // console.log('event.value', this.targetInfo, value)
            this.examinationService.createNewExam(value).subscribe(
                obj => {
                    tipMessage('保存成功', 'success');
                    console.log(obj);
                    this.router.navigate([`../${obj}`], { relativeTo: this.route });
                    this.submitLoading = false;
                },
                err => {
                    tipMessage(err);
                    this.submitLoading = false;
                }
            );
        } else {
            //console.log('this.examDetail[id]', this.examDetail['examId'])
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
