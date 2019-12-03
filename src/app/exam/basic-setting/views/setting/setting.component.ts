import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-basic-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

    tabIndex: any = 0;
    markTypeData: any = [];
    showKA: boolean = false; // 切换到场地配合重新加载列表
    constructor(
        private routInfo: ActivatedRoute,
        private basicSettingService: BasicSettingService,
    ) {
        this.basicSettingService.getDictionaries({ dicType: 'STAFF_TYPE' }).subscribe(
            data => {
                this.markTypeData = data.map(it => {
                    return it.dicCode
                })
                this.tabIndex = this.routInfo.snapshot.paramMap.get('tabIndex');
            },
            err => {
                tipMessage(err);
            }
        )
    };
    ngOnInit() {
        // this.tabIndex = this.routInfo.snapshot.paramMap.get('tabIndex');
    }
    showTab(code) {
        for (let i = 0; i < this.markTypeData.length; i++) {
            if (this.markTypeData[i].value == code) {
                return true;
            }
        }
        return false;
    }
    changeTabIndex(i) {
        if (i == 3) {
            this.showKA = true;
        }
    }
    changeShowStuts = (key) => {
        this[key] = true;
    }
}
