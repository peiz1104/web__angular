import { Component, OnInit } from '@angular/core';
import { error } from 'util';
import { Column } from 'console-ui-ng';
import { NzModalService } from 'ng-zorro-antd';
import { ProxyRegisterApiService } from '../service/proxy-register-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-proxy-register-term',
    templateUrl: './proxy-register-term.component.html',
    styleUrls: ['./proxy-register-term.component.scss']
})
export class ProxyRegisterTermComponent implements OnInit {

    searchName: string;
    isVisible: boolean = false;
    terms: any;
    inputValue: '';
    tabIndex: number = 0;
    spinning: boolean = true;
    inputTip: boolean = false; // 输入框提示
    isConfirmLoading: boolean = false;
    trainingId: any;
    openConditionId: any;
    requiredConditionId: any;
    id: any;
    selection: any[] = [];
    isPcOrMobile: boolean;
    establishIsVisible: boolean = false;
    displayName: any;
    userName: any;
    phoneNumber: any;
    organizationValue: any[] = null;
    options: any = []
    selectedOption: any;
    initializationOfdata: any = [];
    userGroupId: any;
    columns: Column[] = [
        { title: 'ID', tpl: 'id' },
        { title: '用户名', tpl: 'username', styleClass: 'text-left usernameWidth' },
        { title: '员工编号', tpl: 'displayName' },
        { title: '用户所在组织', tpl: 'usergroupName' },
        { title: '类型', tpl: 'colType' },
        { title: '操作', tpl: 'colActions', styleClass: 'text-center actionWidth' },
    ];
    loadTerms(page?, result?) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        if (this.searchName && this.searchName.trim()) {
            params['search'] = this.searchName;
        }
        if (this.tabIndex == 0) {
            params['id'] = this.requiredConditionId;
            this.id = this.requiredConditionId;
            // 加载必修

        } else if (this.tabIndex == 1) {
            // 选修id
            params['id'] = this.openConditionId;
            this.id = this.openConditionId;
        }

        this.serviceapi.getopenrequirelist(params).subscribe(
            res => {
                this.terms = res;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )

    }
    constructor(
        private modal: NzModalService,
        private serviceapi: ProxyRegisterApiService,
        private route: Router,
        private routrInfo: ActivatedRoute
    ) { }

    ngOnInit() {
        // 获取培训班id
        // let tbcId = window.location.search.split('=');
        // this.trainingId = tbcId[1];
        const isPcOrMobile = this.detectmob();
        this.isPcOrMobile = isPcOrMobile;
        console.log(this.routrInfo.params, 22222);
        this.routrInfo.params.subscribe(
            params => {
                this.trainingId = params.tbcId
                this.tabIndex = params.tabIndex || 0;
            }
        )
        // 请求培训班必修选修id
        this.serviceapi.gettrainingdetail(this.trainingId).subscribe(
            result => {
                if (result.openCondition) {
                    this.openConditionId = result.openCondition.id
                }
                if (result.requiredCondition) {
                    this.requiredConditionId = result.requiredCondition.id
                }
                this.loadTerms();
            },
            err => {
                return tipMessage(err);
            }
        )



    }
    getPerson = () => {
        this.serviceapi.getpersonne().subscribe(
            res => {
                if (res) {
                    for (let i = 0; i < res.length; i++) {
                        this.options.push({
                            value: res[i].id,
                            label: res[i].name
                        })
                    }
                    this.selectedOption = this.options[0]
                }
            },
            err => {
                return tipMessage(err);
            }
        )
    }
    // pc or mobile
    detectmob = () => {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }

    search(page?) {
        this.loadTerms()
    }

    delete(row) {
        const ids = [];
        ids.push(row.id)
        let self = this;
        this.modal.confirm({
            title: `确定要删除选择的项吗？`,
            zIndex: 1003,
            onOk: () => {

                let conditionId = self.tabIndex == 0 ? self.requiredConditionId : self.openConditionId;
                self.serviceapi.deleteuser(conditionId, ids).subscribe(
                    res => {
                        tipMessage(`删除成功`, 'success');
                        self.loadTerms();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel: () => {

            }
        });
    }
    // 批量删除
    mutipuleDelete(event) {
        if (this.selection.length) {
            let self = this;
            let ids = this.getIds(this.selection)
            this.modal.confirm({
                title: `确定要删除选择的项吗？`,
                zIndex: 1003,
                onOk: () => {
                    let conditionId = self.tabIndex == 0 ? self.requiredConditionId : self.openConditionId;
                    self.serviceapi.deleteuser(conditionId, ids).subscribe(
                        res => {
                            tipMessage(`删除成功`, 'success');
                            self.loadTerms();
                        },
                        err => {
                            return tipMessage(err);
                        }
                    )
                },
                onCancel: () => {

                }
            });
        } else {
            return tipMessage('请选择要操作的项！');
        }
    }

    // 添加用户
    adduser(event) {
        this.isVisible = true;

    }
    // 姓名
    handelDisplayName = (event) => {
        this.displayName = event;
    }
    // 身份证
    handelUserName = (event) => {
        this.userName = event;
    }
    // 手机号
    handelPhoneNumber = (event) => {
        this.phoneNumber = event;
    }
    // select
    handelSelectChange = (e) => {
    }
    // 获取出生日期
    getBirthdayFromIdCard = (idCard) => {
        var birthday = "";
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
    handelOrganization = (value) => {
        this.userGroupId = value[value.length - 1]
    }
    getOrganization = () => {
        let data = {
            parentId: 1
        }
        this.serviceapi.getOrganization(data).subscribe(
            res => {
                for (let i = 0; i < res.length; i++) {
                    this.initializationOfdata.push({
                        value: res[i].id,
                        label: res[i].name,
                        isLeaf: !res[i].hasChildren
                    })
                }
            },
            err => {
                return tipMessage(err);
            }
        )
    }
    loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
        if (e.index === -1) {
            e.resolve(this.initializationOfdata);
            return;
        }
        const option = e.option;
        option.loading = true;
        if (e.index >= 0) {
            let id = e.option.value;

            setTimeout(() => {
                option.loading = false;
                let data = {
                    parentId: id
                }
                this.serviceapi.getOrganization(data).subscribe(
                    res => {
                        let neArr = []
                        for (let i = 0; i < res.length; i++) {
                            neArr.push({
                                value: res[i].id,
                                label: res[i].name,
                                isLeaf: !res[i].hasChildren
                            })
                        }
                        e.resolve(neArr);
                    },
                    err => {
                        return tipMessage(err);
                    }
                )

            }, 1000);
        }
    }
    // 确认
    handleEstablishOk = () => {
        if (!this.displayName) {
            tipMessage("请输入姓名！")
            return false;
        }
        if (!this.userName) {
            tipMessage("请输入身份证号！")
            return false;
        }
        if (!this.phoneNumber) {
            tipMessage("请输入手机号！")
            return false;
        }
        const reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;//18位
        const reg2 = /(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;//15位
        if (this.userName.length == 18 || this.userName.length == 15) {
            if (reg1.test(this.userName) || reg2.test(this.userName)) {
                // console.log("身份证验证成功")
            } else {
                tipMessage("请输入正确的身份证号")
                return false;
            }
        } else {
            tipMessage("请输入正确的身份证号")
            return false;
        }
        const regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (regPhone.test(this.phoneNumber) === false) {
            tipMessage("请输入正确的手机号")
            return false;
        }
        if (!this.userGroupId) {
            tipMessage("请选择组织！")
            return false;
        }
        const getBirthdayFromIdCard = this.getBirthdayFromIdCard(this.userName);//出生日期

        let data = {
            username: this.userName,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            iDCardNumber: this.userName,
            userGroup: this.userGroupId,
            "userAttribute.userTypes.id": 10,
            conditionId: this.id,
            "userAttribute.birthday": getBirthdayFromIdCard
        }
        console.log(data);
        this.serviceapi.getCiUser(data).subscribe(
            res => {
                if (res.flag == '1') {
                    this.establishIsVisible = false;
                    tipMessage("添加成功！", 'success');
                    this.loadTerms();
                } else if (res.flag == '0') {
                    tipMessage("用户已存在，不能重复创建用户！");
                } else {
                    tipMessage("添加失败！")
                }

            },
            err => {
                tipMessage("添加失败！")
            }
        )
    }
    // 取消
    handleEstablishCancel = () => {
        this.establishIsVisible = false;
    }


    //创建 
    handelEstablish = (event) => {
        this.establishIsVisible = true;
        this.getPerson();
        this.getOrganization();
    }
    handleOk = (e) => {
        // console.log('点击了确定');
        if (!this.inputValue) {
            return tipMessage('请输入员工工号！')
        }
        if (this.inputTip) {
            return tipMessage('请输入符合要求的工号！')
        }
        let params = {
            id: this.tabIndex == 0 ? this.requiredConditionId : this.openConditionId
        }
        this.isConfirmLoading = true;
        this.serviceapi.addResUser(params, this.inputValue).subscribe(
            res => {
                if (res.judgeTbcMax == 'Y') {
                    this.isConfirmLoading = false;
                    return tipMessage('添加人数超过最大注册人数，添加失败！', '', 5000);
                } else {
                    if (res.flag == '1') {
                        this.isVisible = false;
                        this.isConfirmLoading = false;
                        tipMessage("添加成功", 'success');
                        this.loadTerms();
                    } else if (res.flag == '-1') {
                        tipMessage("添加失败");
                        this.isConfirmLoading = false;
                    } else if (res.flag == '0') {
                        tipMessage("用户名不存在，请确认用户名");
                        this.isConfirmLoading = false;
                    }
                }
            },
            err => {
                this.isConfirmLoading = false;
                return tipMessage(err);
            }
        )

    }

    handleCancel = (e) => {
        // console.log(e);
        this.isVisible = false;
        this.inputValue = '';
    }
    _console(event) {
        this.inputValue = event.trim();
        if (/[\u4e00-\u9fa5]/.test(this.inputValue)) {
            this.inputTip = true;
        } else {
            this.inputTip = false;
        }
    }
    // 切换table
    selecttab(event) {
        this.tabIndex = event.index;
        this.loadTerms();
    }
    // 导入
    importuser() {
        // 导入用户注册
        if (this.tabIndex == 0) {
            // tslint:disable-next-line:max-line-length
            this.route.navigate([`/importuser`], { queryParams: { trainingId: this.trainingId, requiredConditionId: this.requiredConditionId, tabIndex: 0 } })
        } else if (this.tabIndex == 1) {
            // tslint:disable-next-line:max-line-length
            this.route.navigate([`/importuser`], { queryParams: { trainingId: this.trainingId, requiredConditionId: this.openConditionId, tabIndex: 1 } })
        }

    }
    userImport(value) {
        this.loadTerms();
    }
    // getids
    getIds(array) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
}
