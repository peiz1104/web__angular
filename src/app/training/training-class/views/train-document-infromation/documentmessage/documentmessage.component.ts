import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-documentmessage',
    templateUrl: './documentmessage.component.html',
    styleUrls: ['./documentmessage.component.scss']
})
export class DocumentmessageComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = false;
    trainId: any;
    testListData: any;
    selection: any[] = [];
    materialGroupId: any;
    trainingClass: any;
    target: any;
    documentStatus: boolean = false;
    searchBy: {
        trainFeeType?: string,
    } = {};
    columns = [
        { title: '资料名称', tpl: 'colTitle' },
        { title: '文件大小', data: 'documentInfo.prettyFileSize' },
        { title: '文件格式', data: 'documentInfo.format' },
        { title: '文件类型', data: 'documentInfo.type' },
        { title: '转码状态', tpl: 'convertStatusCol' },
        // { title: '操作', tpl: 'rowAction', styleClass: 'text-right' }
    ];
    constructor(
        private confrim: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private documnetservice: TrainingClassApiService,
        private fb: FormBuilder,
    ) { }

    // 加载基本费用列表
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.trainFeeType) {
            params['name'] = this.searchBy.trainFeeType;
        } else {
            params['name'] = '';
        }
        this.documnetservice.getdocumentnformation(this.materialGroupId, params).subscribe(
            res => {
                // console.log(res);

                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }
    ngOnInit() {
        this._searchForm = this.fb.group({
            trainFeeType: []
        })
        this.routeInfo.parent.params.subscribe(
            params => {
                this.trainId = params.tbcId;
            }
        )
        this.judgetrainBaseFeeStatus();
        // console.log(this.routeInthisfo.data)
        this.routeInfo.data.subscribe(({ target }: { target: any }) => {
            // this.trainingClass = trainingClass;
            this.target = target;
        });
        // console.log(this.target)
        this.materialGroupId = this.target.materialGroupId;
        this.loadData()
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    applicationreview() {
        this.confrim.confirm({
            title: '申请',
            content: '确定要进行复核申请？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                let params = {
                    documentStatus: 'Y'
                }
                this.documnetservice.costapproval(this.trainId, params).subscribe(
                    res => {
                        tipMessage('复核申请成功！', 'success');
                        this.documentStatus = res;
                        // this.judgetrainBaseFeeStatus();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() { }
        })
    }
    // 请求数据列表加载list判断是否审核通过
    judgetrainBaseFeeStatus() {
        this.documnetservice.judgeapproval(this.trainId).subscribe(
            res => {
                this.documentStatus = res.documentStatus == 'N' ? false : true;
                this.loadData()
            },
            erro => {
                return tipMessage(erro);
            }
        )
    }

}
