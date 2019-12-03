import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrganizeGroupService } from '../../service/organize-group.service';
import { OrganizeGroup } from '../../entity/organize-group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-organize-group-add',
    templateUrl: './organize-group-add.component.html',
    styleUrls: ['./organize-group-add.component.scss']
})
export class OrganizeGroupAddComponent implements OnInit {
    validateForm: FormGroup;
    isEdit = true;  // 是否为编辑状态;
    id;
    status;
    data: any = {};
    organizeGroup: OrganizeGroup;
    userGroup;
    submitLoading: boolean = false;    // 提交按钮失效标识
    ids: any; // id 
    dataLeft: any = [];
    dataRight: any = [];
    arrIdLeft: any = [];
    arrIdLeftData: any = [];
    arrIdRight: any = [];
    arrIdRightData: any = [];
    closeId: any = [];
    closeIdRight: any = [];
    constructor(
        private fb: FormBuilder,
        private location: Location,
        private organizeService: OrganizeGroupService,
        private route: ActivatedRoute,
        private organizeGroupService: OrganizeGroupService,
        private routes: Router
    ) {
        this.id = this.route.snapshot.params.id;
        this.isEdit = this.id ? true : false;
        this.status = this.id ? '编辑分组' : '添加分组';
    }

    _submitForm = ($event, value) => {
        if (this.dataLeft == 0) {
            tipMessage('分配组织请最少选择一个，再保存。', 'warning', 5000);
            return;
        }
        if (this.dataRight == 0) {
            tipMessage('剩余名额优先分配组织请最少选择一个，再保存。', 'warning', 5000);
            return;
        }
        // console.log(this.dataLeft)
        let dataLeftId = [];
        for (let i = 0; i < this.dataLeft.length; i++) {
            dataLeftId.push(this.dataLeft[i].org.id)
        }
        let dataRightId = [];
        for (let i = 0; i < this.dataRight.length; i++) {
            dataRightId.push(this.dataRight[i].org.id)
        }
        let titleId = this.ids;
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        let data = {};
        this.submitLoading = true;
        if (this.validateForm.valid) {
            let event = this.validateForm.value;
            if (titleId) {
                // 编辑
                data = {
                    userGroupIds: dataRightId,
                    ugIds: dataLeftId,
                    name: event.name,
                    userGroupId: event.userGroup.id
                }
                this.organizeGroupService.edit(data, titleId).subscribe(
                    () => {
                        this.submitLoading = false;
                        tipMessage('保存成功', 'success');
                        this.routes.navigate(['/planning/organize/list']);
                    }
                )
            } else {
                // 创建
                data = {
                    userGroupIds: dataRightId,
                    ugIds: dataLeftId,
                    name: event.name,
                    userGroupId: event.userGroup.id
                }
                this.organizeGroupService.selectListadd(data).subscribe(
                    () => {
                        this.submitLoading = false;
                        tipMessage('保存成功', 'success');
                        this.routes.navigate(['/planning/organize/list']);
                    }
                )
            }
        }
        // console.log(data)
    };

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.ids = params.id;
            // console.log(this.ids)
            this.handleLeftData(this.ids)
            this.handleRigthData(this.ids)
        })
        this.submitLoading = false;
        this.organizeGroup = new OrganizeGroup();
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            description: [null, []],
            userGroup: [null, [Validators.required]]
        });
        if (this.isEdit) {
            this.organizeService.getOne(this.id).subscribe(
                obj => {
                    this.validateForm.get('name').setValue(obj.name);
                    this.validateForm.get('description').setValue(obj.description);
                    this.validateForm.get('userGroup').setValue(obj.userGroup);
                }
            );
        }
    }


    //左边数据
    handleLeftData = (id) => {
        this.organizeGroupService.selectList(id).subscribe(
            (budget) => {
                this.dataLeft = budget;
                let allId = [];
                for (let i = 0; i < this.dataLeft.length; i++) {
                    allId.push(this.dataLeft[i].org.id)
                }
                this.closeId = allId;
                // console.log(this.closeId)
            }
        )
    }

    // 右边数据
    handleRigthData = (id) => {
        this.organizeGroupService.selectListright(id).subscribe(
            (budget) => {
                this.dataRight = budget;
                let allId = [];
                for (let i = 0; i < this.dataRight.length; i++) {
                    allId.push(this.dataRight[i].org.id)
                }
                this.closeIdRight = allId;
                // console.log(this.closeId)
            }
        )
    }

    // 点击左边
    handleLeftClick = (item) => {
        let id = item.org.id;
        let arr = this.arrIdLeft;
        if (arr.indexOf(id) == -1) {
            arr.push(id);
        } else {
            arr.splice(arr.indexOf(id), 1);
        }
        let data = this.dataLeft;
        let newArr = []
        for (let i = 0; i < data.length; i++) {
            if (arr.indexOf(data[i].org.id) !== -1) {
                newArr.push(data[i])
            }
        }
        this.arrIdLeftData = newArr;

    }

    // 点击 右边 选中
    handleRightClick = (id, item) => {
        this.arrIdRight = [];
        let arr = this.arrIdRight;
        if (arr.indexOf(id) == -1) {
            arr.push(id);
            this.arrIdRightData.push(item);
        } else {
            arr.splice(arr.indexOf(id), 1);
            this.arrIdRightData.splice(arr.indexOf(id), 1);
        }
        let data = this.dataRight;
        let newArr = []
        for (let i = 0; i < data.length; i++) {
            if (arr.indexOf(data[i].org.id) !== -1) {
                newArr.push(data[i])
            }
        }
        this.arrIdRightData = newArr;
    }

    // 去重
    unique2 = (data) => {
        let res = [];
        let json = {};
        for (let i = 0; i < data.length; i++) {
            if (!json[data[i].org.id]) {
                res.push(data[i]);
                json[data[i].org.id] = 1;
            }
        }
        return res;
    }

    // 左边 =》 右边 all
    handleToRightAll = () => {
        if (this.dataLeft.length > 0) {
            let newRightData = this.dataLeft.concat(this.dataRight);
            let newRightDataRemoval = this.unique2(newRightData);
            this.dataRight = newRightDataRemoval;
            let allId = [];
            for (let i = 0; i < this.dataRight.length; i++) {
                allId.push(this.dataRight[i].org.id)
            }
            this.closeIdRight = allId;
        } else {
            tipMessage('分配组织为空');
        }

    }

    // 左边 至 右边 部分
    handleToRightPart = () => {
        if (this.arrIdLeftData.length > 0) {
            let newRightData = this.arrIdLeftData.concat(this.dataRight);
            let newRightDataRemoval = this.unique2(newRightData);
            this.dataRight = newRightDataRemoval;
            let allId = [];
            for (let i = 0; i < this.dataRight.length; i++) {
                allId.push(this.dataRight[i].org.id)
            }
            this.closeIdRight = allId;
            // console.log(this.closeId)
            this.arrIdLeftData = [];
            this.arrIdLeft = []
        } else {
            tipMessage('请选择组织');
        }
    }

    // 左边点击 删除
    handleCloseLeft = (id) => {
        // console.log(id)
        this.closeId.splice(this.closeId.indexOf(id), 1);

        // 删除 被选中 数据
        if (this.arrIdLeftData.length > 0) {
            for (let i = 0; i < this.arrIdLeftData.length; i++) {
                if (this.arrIdLeftData[i].org.id == id) {
                    this.arrIdLeftData.splice(i, 1)
                }
            }
            // console.log(this.arrIdLeftData)
        }

        // 删除 左边 数据
        for (let i = 0; i < this.dataLeft.length; i++) {
            if (this.dataLeft[i].org.id == id) {
                this.dataLeft.splice(i, 1)
            }
        }

        // 删除 右边 数据
        if (this.dataRight.length > 0) {
            // console.log(this.dataRight)
            let newIdRightArr = [];
            for (let i = 0; i < this.dataRight.length; i++) {
                newIdRightArr.push(this.dataRight[i].org.id);
            }
            if (newIdRightArr.indexOf(id) !== -1) {
                this.dataRight.splice(newIdRightArr.indexOf(id), 1)
            }
        }
        // console.log(this.dataLeft)
    }

    // 右边 点击 删除
    handleCloseRight = (id) => {
        // console.log(id)
        this.closeIdRight.splice(this.closeIdRight.indexOf(id), 1);
        for (let i = 0; i < this.dataRight.length; i++) {
            if (this.dataRight[i].org.id == id) {
                this.dataRight.splice(i, 1)
            }
        }
        if (this.arrIdRight[0] == id) {
            this.arrIdRight = [];
        }
    }
    swapItems = (arr, index1, index2) => {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    // 上移 一个
    handleMoveUpOne = () => {
        if (this.arrIdRight.length == 1) {
            let newIdRight = []
            for (let i = 0; i < this.dataRight.length; i++) {
                newIdRight.push(this.dataRight[i].org.id);
            }
            let index = newIdRight.indexOf(this.arrIdRight[0]);
            if (index == 0) {
                tipMessage('已在最上边', 'warning');
            } else {
                this.swapItems(this.dataRight, index, index - 1)
            }
        } else {
            tipMessage('请选择一个组织', 'warning');
        }
    }

    // 下移 一个
    handleMoveDownOne = () => {
        if (this.arrIdRight.length == 1) {
            let newIdRight = []
            for (let i = 0; i < this.dataRight.length; i++) {
                newIdRight.push(this.dataRight[i].org.id);
            }
            let index = newIdRight.indexOf(this.arrIdRight[0]);
            if (index == newIdRight.length - 1) {
                tipMessage('已在最上边', 'warning');
            } else {
                this.swapItems(this.dataRight, index, index + 1)
            }
        } else {
            tipMessage('请选择一个组织', 'warning');
        }
    }

    // 上移到顶部
    handleMoveUp = () => {
        if (this.arrIdRight.length == 1) {
            let newIdRight = []
            for (let i = 0; i < this.dataRight.length; i++) {
                newIdRight.push(this.dataRight[i].org.id);
            }
            let index = newIdRight.indexOf(this.arrIdRight[0]);
            if (index == 0) {
                tipMessage('已在最上边', 'warning');
            } else {
                let timer = setInterval(() => {
                    let newIdRight = []
                    for (let i = 0; i < this.dataRight.length; i++) {
                        newIdRight.push(this.dataRight[i].org.id);
                    }
                    let index = newIdRight.indexOf(this.arrIdRight[0]);
                    if (index == 0) {
                        clearInterval(timer)
                    } else {
                        this.swapItems(this.dataRight, index, index - 1)
                    }
                }, 30)
            }
        } else {
            tipMessage('请选择一个组织', 'warning');
        }
    }

    // 下移 顶部
    handleMoveDown = () => {
        if (this.arrIdRight.length == 1) {
            let newIdRight = []
            for (let i = 0; i < this.dataRight.length; i++) {
                newIdRight.push(this.dataRight[i].org.id);
            }
            let index = newIdRight.indexOf(this.arrIdRight[0]);
            if (index == newIdRight.length - 1) {
                tipMessage('已在最上边', 'warning');
            } else {
                let timer = setInterval(() => {
                    let newIdRight = []
                    for (let i = 0; i < this.dataRight.length; i++) {
                        newIdRight.push(this.dataRight[i].org.id);
                    }
                    let index = newIdRight.indexOf(this.arrIdRight[0]);
                    if (index == newIdRight.length - 1) {
                        clearInterval(timer)
                    } else {
                        this.swapItems(this.dataRight, index, index + 1)
                    }
                }, 30)
            }

        } else {
            tipMessage('请选择一个组织', 'warning');
        }
    }

    // 清楚 右边 数据
    handelClearRightData = () => {
        this.dataRight = [];
        this.arrIdRight = [];
    }

    // 组织树  封装好的
    logSelectGroup = (e) => {
        // console.log(e)
        let data = e;
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
            newArr.push({
                org: {
                    id: data[i].id,
                    name: data[i].name
                }
            })
        }
        let newLeftData = this.dataLeft.concat(newArr);
        let newLeft = this.unique2(newLeftData);
        this.dataLeft = newLeft;
        let allId = [];
        for (let i = 0; i < this.dataLeft.length; i++) {
            allId.push(this.dataLeft[i].org.id)
        }
        this.closeId = allId;
        // console.log(this.closeId)
    }

    // 保存
    handlePreservation = () => {
        if (this.dataLeft == 0) {
            tipMessage('分配组织请最少选择一个，再保存。', 'warning');
            return;
        }
        if (this.dataRight == 0) {
            tipMessage('剩余名额优先分配组织请最少选择一个，再保存。', 'warning', 5000);
            return;
        }
        // console.log(this.dataLeft)
        let dataLeftId = [];
        for (let i = 0; i < this.dataLeft.length; i++) {
            dataLeftId.push(this.dataLeft[i].org.id)
        }
        let dataRightId = [];
        for (let i = 0; i < this.dataRight.length; i++) {
            dataRightId.push(this.dataRight[i].org.id)
        }
        let titleId = this.ids;
        // console.log(this.dataRight)
        let data = {
            sugId: titleId,
            userGroupIds: dataRightId,
            ugIds: dataLeftId
        }
        // console.log(data)
        this.organizeGroupService.selectListadd(data).subscribe(
            () => {
                tipMessage('保存成功', 'success');
            }
        )
    }

    // 取消
    handleCancel = () => {
        // this.routes.navigate(['/planning/organize/list'])
        this.goBack();
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    addGroup(event) {
        this.submitLoading = true;
        this.organizeService.create(event).subscribe(
            ok => {
                tipMessage('添加成功', 'success');
                let That = this;
                setTimeout(function () {
                    That.goBack();
                }, 500)
            },
            err => {
                tipMessage('添加失败');
                this.submitLoading = false;

            }
        )
    }

    editGroup(id, event) {
        this.submitLoading = true;
        if (id) {
            event.id = id;
        }
        this.organizeService.update(event).subscribe(
            ok => {
                tipMessage('编辑成功', 'success');
                let That = this;
                setTimeout(function () {
                    That.goBack();
                }, 500)
            },
            err => {
                tipMessage('编辑失败');
                this.submitLoading = false;
            }
        )
    }
    goBack() {
        this.location.back();
    }

}
