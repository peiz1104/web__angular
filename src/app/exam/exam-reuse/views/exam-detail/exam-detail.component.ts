import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Examination } from 'app/exam/exam-reuse/entity/examination';
import { ExaminationService } from '../../service/examination.service';
@Component({
    selector: 'spk-exam-detail',
    templateUrl: './exam-detail.component.html',
    styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
    exam: Examination;
    type: string;
    constructor(private route: ActivatedRoute, private examinationService: ExaminationService) { }

    ngOnInit() {
        this.examinationService.check_pattern().subscribe(
            data => {
                this.type = data.examPattern;
            }
        )
        this.route.data.subscribe(({ examination }: { examination: any }) => {
            this.exam = examination;
            // console.log(examination, this.exam.type)
        });
    }

}
