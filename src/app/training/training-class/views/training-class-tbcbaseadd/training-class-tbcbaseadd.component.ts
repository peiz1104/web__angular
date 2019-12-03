import {Component, Input, OnInit} from '@angular/core';
import {TrainingClassTbcbaseService} from "../../service/training-class-tbcbase.service";
import {NzModalSubject} from "ng-zorro-antd";
import {CuiPagination} from "console-ui-ng";
import {TbcBase} from "../../../entity/tbc-base";


@Component({
    selector: 'spk-training-class-tbcbaseadd',
    templateUrl: './training-class-tbcbaseadd.component.html',
    styleUrls: ['./training-class-tbcbaseadd.component.scss']
})
export class TrainingClassTbcbaseaddComponent implements OnInit {


    @Input() offeringId: number;
    trainBase: TbcBase[];
    pagination: CuiPagination;
    columns;
    loading: boolean = true;
    selected: number[];
    selection: any;
    searchtext;
    constructor(private trainBaseService: TrainingClassTbcbaseService,
        private subject: NzModalSubject) {
        this.columns = [
            { title: '基地名称', data: 'baseName', styleClass: 'text-left' },
            { title: '地址', data: 'baseAddress', styleClass: 'text-left' },
            { title: '编号', data: 'baseNo', styleClass: 'text-left' },
            /*{ title: '类型', data: 'baseType', tpl: 'baseTypeCol', styleClass: 'text-center' },*/
            { title: '面积', data: 'buildArea', styleClass: 'text-right' }
        /*    { title: '等级', data: 'baseLevel', styleClass: 'text-center' },*/

        ];
    }
    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
          offeringId : this.offeringId,
          baseName: this.searchtext,
          page: page ? page.number : 0,
          size: page ? page.size : '',
          sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.trainBaseService.pageList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.trainBase = pag.content;
                this.loading = false;
            }
        );
    }

    emitDataOutside(e) {
        console.log(this.selection);
        this.subject.next({ event: 'onOk', data: this.selection });
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

}
