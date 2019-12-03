import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { ExaminationService } from '../../service/examination.service';
import { Examination } from '../../entity/examination';
@Component({
    selector: 'spk-exam-edit',
    templateUrl: './exam-edit.component.html',
    styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
    examDetail: Examination;
    @Input() examId: any;
    id: any;

    constructor(private route: ActivatedRoute, private examinationService: ExaminationService, private router: Router) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('exam_id');
        // tis.Id = this.route.snapshot.paramMap.get('id');
        console.log('ExamEditComponent', this.id)
        this.route.data.subscribe(
            (data: { examination: any }) => {
                this.examDetail = data.examination || {};
                // if (data.examination) {
                //   console.log(data.examination);
                //   // this.createOrEditor = false ;
                //   // this.examDetail = data.examination;
                // } else {
                //   // this.createOrEditor = true;
                //   console.log(456);
                // }
            }
        )
    }
    goTo(url) {
        this.router.navigate([url + ''], { relativeTo: this.route });
    }

}
