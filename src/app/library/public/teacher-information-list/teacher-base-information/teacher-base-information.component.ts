import { Component, OnInit, Input } from '@angular/core';
import { TrainBaseService } from '../../../service/train-base.service';
import { TrainBase } from 'app/library/entity/train-base';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-base-information',
    templateUrl: './teacher-base-information.component.html',
    styleUrls: ['./teacher-base-information.component.scss']
})
export class TeacherBaseInformationComponent implements OnInit {
    @Input() teacherId;
    @Input() rank; // External外部讲师；FullTime专职讲师；PartTime兼职讲师
    data: any;
    spinning: boolean = false;
    isVisible: boolean = false;
    // 加载数据
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        this.service.getTeacherBaseList(this.teacherId).subscribe(
            res => {
                //  console.log(res,"res");
                this.spinning = false;
                this.data = res;
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }
    constructor(
        private service: TrainBaseService,
        private fb: FormBuilder,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        // console.log(this.teacherId);
        this.loadData();
    }
    // 获取生日
    getbirthday(idCard) {
        let birthday = "";
        if (idCard != null && idCard != "") {
            if (idCard.length == 15) {
                birthday = "19" + idCard.substr(6, 6);
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }

        return birthday;
    }
    // 渠道判断
    getchannel(value) {
        if (value == 'PERSONAL') {
            return '个险'
        } else if (value == 'GROUP') {
            return '团险'
        } else if (value == 'ELECTRIC') {
            return '电销'
        } else if (value == 'HEALTH') {
            return '健康险'
        } else if (value == 'BANK') {
            return '银保'
        } else {
            return null
        }
    }
    // 讲师资格PREPARATORY , //预备讲师

    getqualifications(value) {
        if (value == 'PREPARATORY') {
            return '预备讲师'
        } else if (value == 'ASSISTANT') {
            return '助理讲师'
        } else if (value == 'LECTURER') {
            return '中级讲师'
        } else if (value == 'SENIOR') {
            return '高级讲师'
        } else {
            return null
        }
    }
    // 教师级别
    getTeacherleve(value) {
        if (this.rank == 'FullTime') {
            if (value == 'PREPARATORY') {
                return '预备讲师'
            } else if (value == 'ASSISTANT') {
                return '助理讲师'
            } else if (value == 'LECTURER') {
                return '中级讲师'
            } else if (value == 'SENIOR') {
                return '高级讲师'
            } else {
                return null
            }
        } else if (this.rank == 'PartTime') {
            if (value == 'JUNIOR') {
                return '初级讲师'
            } else if (value == 'LECTURER') {
                return '中级讲师'
            } else if (value == 'SENIOR') {
                return '高级讲师'
            } else {
                return null
            }
        }
    }
    getStar(value) {
        // console.log(value)
        if (value == 0) {
            return '准星'
        } else if (value == 1) {
            return '一星'
        } else if (value == 2) {
            return '二星'
        } else if (value == 3) {
            return '三星'
        } else if (value == 4) {
            return '四星'
        } else if (value == 5) {
            return '五星'
        } else {
            return null
        }
    }
    // 证件类型IDCARD, //省份证

    getCardType(value) {
        if (value == 'IDCARD') {
            return '身份证'
        } else if (value == 'DRIVER') {
            return '驾驶证'
        } else if (value == 'PASSPORT') {
            return '护照'
        } else {
            return null
        }
    }
    // 讲师
    getRank(value) {
        if (value == 'PREPARATORY') {
            return '讲师'
        } else if (value == 'ASSISTANT') {
            return '副教授'
        } else if (value == 'LECTURER') {
            return '教授'
        } else if (value == 'SENIOR') {
            return '社会培训机构讲师'
        } else {
            return null
        }
    }

    // 最高学历
    geteducation(value) {
        if (value == 'SPECIALTY') {
            return '专科'
        } else if (value == 'UNDERGRADUATE') {
            return '本科'
        } else if (value == 'MASTER') {
            return '硕士'
        } else if (value == 'DOCTOR') {
            return '博士'
        } else {
            return '其他'
        }
    }

    // 学位
    getdegree(value) {
        if (value == 'BANCHELOR') {
            return '学士'
        } else if (value == 'MASTER') {
            return '硕士'
        } else if (value == 'DOCTOR') {
            return '博士'
        } else {
            return '其他'
        }
    }
    lookPdf() {
        this.isVisible = true;
    }
    handleCancel(event) {
        this.isVisible = false;
    }

}
