import { Component, OnInit, Injectable } from '@angular/core';
import { TrainingClass } from './../../../entity/training-class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'spk-training-class-performence',
    templateUrl: './training-class-performence.component.html',
    styleUrls: ['./training-class-performence.component.scss']
})
export class TrainingClassPerformenceComponent implements OnInit {
    classId: number;
    tableIndex: number = 0;
    currentStatus: string = 'N';
    tabs = [
        {
            content: '班级成绩',
            index: 1
        },
        {
            content: '课程成绩',
            index: 2
        }
    ];
    trainingName: string;
    constructor(
        private route: ActivatedRoute,
        private http: Http
    ) {
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            this.classId = data.trainingClass.id;
            this.trainingName = data.trainingClass.name;
        });
    }
    ngOnInit() {
        // tslint:disable-next-line:max-line-length
        (this.http.get(`/api/training/implement/isRisk?objectId=${this.classId}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
            // console.log(data, 444);
            this.currentStatus = data.isRisk;
        });
        this.route.queryParamMap.subscribe(
            (data) => {
                this.tableIndex = +data.get('Index') || 0;
            }
        )
    }
    changeTableIndex(event) {
        this.tableIndex = event.index;
    }
}
