/*
 * @Author: mozhengqian
 * @Date: 2017-11-07 09:52:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-21 16:43:10
 */
import { Component, OnInit, Input } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-test-library',
    templateUrl: './test-library.component.html',
    styleUrls: ['./test-library.component.scss']
})
export class TestLibraryComponent implements OnInit {
    questionTypeData: any;
    knowledgeId: any;
    userGroupId: any;
    isPaper: any;
    epId: any;
    defaultType: any = {// 八个基本题型 拼音，后台配置的
        'DANX': true,
        'DUOX': true,
        'TK': true,
        'PD': true,
        'PP': true,
        'JD': true,
        'ALFX': true,
        'YDLJ': true,
    }
    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router,
        private testQuestionService: TestQuestionService
    ) { }

    ngOnInit() {
        this.testQuestionService.getQuestionType().subscribe(data => {// 获取试题分类数据
            // console.log(data);
            this.questionTypeData = data;
        });
        this.isPaper = this.activatedRoute.snapshot.params['isPaper'];
        this.isPaper = this.isPaper == 'true';
        this.knowledgeId = this.activatedRoute.snapshot.params['knowledgeId'];
        this.epId = this.activatedRoute.snapshot.params['epId'];
        this.userGroupId = this.activatedRoute.snapshot.params['userGroupId'];
    }
    goAdd(data) {
        if (this.defaultType[data.baseCode]) { // 校验八个基本题型才可创建试题
            let obj = {
                'userGroupId': this.userGroupId ? this.userGroupId : '',
                'baseCode': data.baseCode ? data.baseCode : '',
                'typeCode': data.typeCode ? data.typeCode : '',
                'knowledgeId': this.knowledgeId ? this.knowledgeId : '',
                'typeName': data.typeName ? data.typeName : '',
                'epId': this.epId
            }
            this.router.navigate([`/exam/test-question/add`, obj]);
        } else {
            tipMessage('暂不支持创建该题型！！！', 'info');
        }

    }
    goback = () => {
        this.router.navigate([`exam/test-question/list`, {
            knowledgeId: this.knowledgeId,
            userGroupId: this.userGroupId
        }]);
    }

}
