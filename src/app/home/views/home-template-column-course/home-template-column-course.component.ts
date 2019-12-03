import { Course } from './../../entity/course';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';

@Component({
    selector: 'spk-home-template-column-course',
    templateUrl: './home-template-column-course.component.html',
    styleUrls: ['./home-template-column-course.component.scss']
})
export class HomeTemplateColumnCourseComponent implements OnInit, OnChanges {
    @Input() itemConfig?: any;
    @Output() isLoad = new EventEmitter<any>();
    courseInfo: any[];
    courseStyle: string = 'tbl_1';
    constructor(
        private templateService: HomeTemplateApiService,
    ) { }
    ngOnInit() {
    }
    ngOnChanges() {
        this.courseStyle = this.itemConfig.layoutModuleTemplateName || 'tbl_1';
        this.initList();
        this.loadData();
    }
    initList() {
        this.courseInfo = [];
        if (this.courseStyle == 'tbl_1') {
            for (let i = 0; i < 5; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_2') {
            for (let i = 0; i < 10; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_3') {
            for (let i = 0; i < 8; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_4') {
            for (let i = 0; i < 7; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_5') {
            for (let i = 0; i < 8; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else if (this.courseStyle == 'tbl_6') {
            for (let i = 0; i < 6; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        } else {
            for (let i = 0; i < 9; i++) {
                this.courseInfo.push({ positionTable: i })
            }
        }
    }
    loadData() {
        // tslint:disable-next-line:no-unused-expression
        if (this.itemConfig.id) {
            this.templateService.getCourseInfo(this.itemConfig.id).subscribe(
                obj => {
                    obj.forEach((item, i) => {
                        if (i < this.courseInfo.length) {
                            this.courseInfo[i] = item;
                        }
                    });
                    this.courseInfo.sort((a, b) => a.positionTable - b.positionTable);
                    this.templateService.configInfoAll.forEach(e => {
                        if (e.id == this.itemConfig.id) {
                            e.itemInfo = this.courseInfo;
                        }
                    });
                    this.isLoad.emit(true);
                },
                err => {
                    this.isLoad.emit(true);
                }
            )
        }
    }

}
