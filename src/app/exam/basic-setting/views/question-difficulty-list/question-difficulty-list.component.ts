import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CuiPagination } from 'console-ui-ng';

import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-question-difficulty-list',
    templateUrl: './question-difficulty-list.component.html',
    styleUrls: ['./question-difficulty-list.component.scss']
})
export class QuestionDifficultyListComponent implements OnInit {
    @Input() tabIndex;
    pagination: CuiPagination;
    loading: boolean = true;
    isSpinning: boolean = false
    editObj: any = {};
    columnsData
    columns: any = [
        { title: '试题难度编码', data: 'diffCode', styleClass: 'text-center' },
        { title: '试题难度名称', data: 'diffName', styleClass: 'text-center' },
        { title: '试题难度说明', data: 'diffDesc', styleClass: 'diff-desc', style: { 'max-width': '250px' } },
        { title: '发布状态', tpl: 'isStart', styleClass: 'text-center' },
        { title: '操作', tpl: 'option', styleClass: 'text-center' }
    ];
    constructor(
        private basicSettingService: BasicSettingService,
        private router: Router,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this.getDifficultyListData()
    }

    getDifficultyListData(page?: CuiPagination) {
        this.isSpinning = true;
        this.pagination = page;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.basicSettingService.getQADifficultyList(params).subscribe(data => {
            this.pagination = data;
            this.columnsData = data['content'];
            this.loading = false;
            this.isSpinning = false;
        });
    }
    handleDifficulty(row) {
        this.editObj = row;
        if (this.editObj && this.editObj['id']) {
            this.router.navigate(['/exam/basic-setting/edit-diff', this.editObj['id']])
        } else {
            this.router.navigate(['/exam/basic-setting/add-diff'])
        }
    }

    handleIsstart(row) {
        this.editObj = row;
        let params = {
            id: this.editObj['id'],
            isStart: !this.editObj['isStart']
        }
        this.basicSettingService.updateDifficultyStart(params).subscribe(data => {
            tipMessage('修改成功!', 'success');
            this.getDifficultyListData()
        }, error => { tipMessage(error) }
        );
    }
    showConfirm = (row) => {
        this.confirmServ.confirm({
            title: '是否确认删除？',
            content: '',
            zIndex: 1003,
            onOk: () => {
                this.deleteDifficulty(row);
            },
            onCancel() {
            }
        });
    }

    deleteDifficulty(row) {
        this.editObj = row;
        let params = {
            id: this.editObj['id']
        }
        this.basicSettingService.deleteDifficulty(params).subscribe((data) => {
            tipMessage('删除成功!', 'success');
            this.getDifficultyListData()
        }, error => { tipMessage(error) });
    }
    refresh() {
        this.getDifficultyListData();
    }
}
