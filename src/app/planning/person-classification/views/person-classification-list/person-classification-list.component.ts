import { Component, OnInit } from '@angular/core';
import { PersonClassificationService } from '../../service/person-classification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PersonClassification } from '../../entity/person-classification';
// import { TreeComponent, TreeNode } from 'angular-tree-component';
import 'rxjs/add/operator/toPromise';
import { CuiLayer } from 'console-ui-ng';

@Component({
    selector: 'spk-person-classification-list',
    templateUrl: './person-classification-list.component.html',
    styleUrls: ['./person-classification-list.component.scss']
})
export class PersonClassificationListComponent implements OnInit {

    activedGroup;
    newGroup;
    searchtext;

    personClassification;

    selected;
    columns;
    subGroups;

    options = {
        getChildren: (node: any) => {
            return this.getChildren(node.id).toPromise();
        }
    };

    constructor(
        private personClassificationService: PersonClassificationService,
        private router: Router,
        private route: ActivatedRoute,
        private layer: CuiLayer) {
        this.columns = [
            { title: 'ID', data: 'id' },
            { title: '分类名称', data: 'name' },
            { title: '操作', tpl: 'actions', class: 'text-right' },
        ];
    }

    ngOnInit() {

    }

    getChildren(parentId: number): Observable<PersonClassification[]> {
        return this.personClassificationService.groups(parentId);
    }


    edit(ugs) {
        if (!ugs) {
            return;
        }
        this.activedGroup = ugs[0];
        this.loadData();
    }

    delete(id?: number) {
        let ids = id ? [id] : this.selected;

        if (!ids) {
            this.layer.msg('请选择要删除的部门');
        }

        this.layer.confirm(
            '确认要删除选中的部门吗？',
            () => {
                this.personClassificationService.delete(ids).subscribe(
                    () => {
                        this.layer.msg('删除成功');
                        this.loadData();
                    },
                    err => { }
                );
            }
        );
    }

    loadData() {
        let parentId = this.activedGroup ? this.activedGroup.id : undefined;
        this.personClassificationService.groups(parentId).subscribe(
            groups => {
                this.personClassification = groups;
                this.subGroups = groups
            }
        );
    }

    onSelect(selIds) {
        this.selected = selIds;
    }

}
