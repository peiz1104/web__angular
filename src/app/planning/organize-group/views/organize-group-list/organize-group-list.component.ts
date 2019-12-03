import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizeGroupService } from '../../service/organize-group.service';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { OrganizeGroup } from '../../entity/organize-group';
import { Router, ActivatedRoute } from '@angular/router';
import { UserGroup } from './../../../../system/entity/user-group';
import { DesignatedPlanService } from 'app/planning/designatedplan/service/designatedplan.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-organize-group-list',
    templateUrl: './organize-group-list.component.html',
    styleUrls: ['./organize-group-list.component.scss']
})
export class OrganizeGroupListComponent implements OnInit {
    pagination: CuiPagination;
    loading: boolean = true;
    searchtext;
    columns;
    validateForm: FormGroup;
    organizeGroup: OrganizeGroup[];
    selected: number[];
    searchBy: {
        groupNo?: string,
        displayName?: string,
        name?: string,
        userGroup?: UserGroup[],
    } = {};
    userGroupIds;
    selection: any;

    constructor(private organizeService: OrganizeGroupService,
        private designatedPlanService: DesignatedPlanService,
        private fb: FormBuilder,
        private dialog: CuiLayer,
        private router: Router,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '分组名称', tpl: 'name' },
            { title: '分组编号', tpl: 'cid' },
            // { title: '所属机构', styleClass: 'text-center', tpl: 'userGroup' },
            { title: '创建人', styleClass: 'text-center', tpl: 'createdByDisplayName' },
            { title: '创建日期', styleClass: 'text-center', tpl: 'createdDate' },
            { title: '编辑', styleClass: 'text-center', tpl: 'edit' },
        ];
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            displayName: ['', []],
            groupNo: ['', []],
            name: ['', []],
            userGroup: [null]
        });
        this.searchBy.name = '';
        this.searchBy.displayName = '';
        this.searchBy.groupNo = '';
        this.designatedPlanService.getCurrentUser().subscribe(
            user => {
                if (user && user.managerGroup) {
                    this.searchBy.userGroup = [user.managerGroup];
                }
                this.loadData();
            }
        )

    }

    _submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        this.searchBy = value;
        this.loadData();
    };

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchBy.name,
            displayName: this.searchBy.displayName,
            userGroupIds: this.searchBy.userGroup ? this.searchBy.userGroup.map(it => it.id) : [],
            id: this.searchBy.groupNo,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.organizeService.pageList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.organizeGroup = pag.content;
                this.loading = false;
                this.selection = [];
            }
        );
    }
    onSelect(selIds: any[]) {
        this.selected = selIds;

    }



    delete(id?) {

        const selection = this.selection;
        for (let i = 0; i < selection.length; i++) {
            if (selection[i].createdById !== selection[i].longerId) {
                tipMessage('不允许删除非当前用户创建的分组！', 'warning', 4000);
                return
            }
        }

        let ids = id ? [id] : this.selected;
        if (!ids || ids.length == 0) {
            tipMessage('请选择要删除的数据');
            return;
        }

        this.dialog.confirm('确认要删除吗？',
            () => {
                this.organizeService.delete(ids).subscribe(
                    () => {
                        this.dialog.msg('删除成功');
                        this.loadData();
                    },
                    err => { this.dialog.confirm(err) }
                );
            }
        );
    }



}
