import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryGroup } from './../../../entity/category-group';
import { Category } from './../../../entity/category';
import { HourService } from '../../../managementservice/hour.service';
import { NzMessageService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { elementDef } from '@angular/core/src/view/element';
declare let $: any;

@Component({
    selector: 'spk-editcreate',
    templateUrl: './editcreate.component.html',
    styleUrls: ['./editcreate.component.scss']
})
export class EditcreateComponent implements OnInit {
    validateForm: FormGroup;
    _options = null;
    demoValue = 1;
    showstate: boolean = false;
    btnstate: boolean = false;
    typename: any;
    editid: any;
    spinning: boolean = false;
    url: string = '/api/period/traintype/children'
    formDatatheme = {
        name: ['', [Validators.required]],
        description: [],
        parent: [null, [Validators.required]],
        billingType: [0],
        weight: []
    };
    formData = {
        name: ['', [Validators.required]],
        parent: [null, [Validators.required]],
        description: [],
    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private hourservice: HourService,
        private message: NzMessageService
    ) { }

    ngOnInit() {

        this.routeInfo.queryParams.subscribe((params) => {
            this.showstate = params.type == 'fc'
            this.typename = params.type;
            this.editid = params.id;
        })
        if (this.typename == 'trainthemeadd') {
            this.url = '/api/period/traintheme/children'
        } else if (this.typename == 'trainchanel') {
            this.url = '/api/period/trainwey/children'
        } else if (this.typename == 'traintsource') {
            this.url = '/api/period/trainsource/children'
        }

        this.validateForm = this.fb.group(this.showstate ? this.formDatatheme : this.formData);
        // 如果是培训类型的编辑
        if (this.editid) {
            if (this.showstate) {
                this.geteditmethod(this.typename, this.editid)

            } else {
                this.geteditmethod(this.typename, this.editid)
            }

        } else {
            this.addCatorgyShow(this.typename);
        }
    }
    // 添加分类回显
    addCatorgyShow(typename) {
        let value;
        // if (typename == 'fc') {
        //     value = JSON.parse(window.localStorage.getItem('fc'));
        // } else if (typename == 'trainthemeadd') {
        //     value = JSON.parse(window.localStorage.getItem('trainthemeadd'));
        // } else if (typename == 'trainchanel') {
        //     value = JSON.parse(window.localStorage.getItem('trainchanel'));
        // } else if (typename == 'traintsource') {
        //     value = JSON.parse(window.localStorage.getItem('traintsource'));
        // }
        value = JSON.parse(window.localStorage.getItem(typename));
        // console.log(value, 3243);
        this.validateForm.get('parent').setValue(value);
    }
    removelocalstorage() {
        window.localStorage.removeItem('fc');
        window.localStorage.removeItem('trainthemeadd');
        window.localStorage.removeItem('trainchanel');
        window.localStorage.removeItem('traintsource')
    }
    // 进行编辑edit
    geteditmethod(typename, editid) {
        this.spinning = true;
        if (typename == 'fc') {
            // 培训类型
            this.hourservice.gettraintypeedit(editid).subscribe(
                res => {
                    this.spinning = false;
                    // console.log(res, 432341)
                    this.traintypeedit(res);
                },
                err => {
                    this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )
        } else if (typename == 'trainthemeadd') {
            // 培训主题
            this.hourservice.gettrainthemeedit(editid).subscribe(
                res => {
                    this.spinning = false;
                    this.assignmentedit(res);
                },
                err => {
                    this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )
        } else if (typename == 'trainchanel') {
            // 培训方式
            this.hourservice.gettrainwayedit(editid).subscribe(
                res => {
                    this.spinning = false;
                    this.assignmentedit(res);
                },
                err => {
                    this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )
        } else if (typename == 'traintsource') {
            // 培训资源
            this.hourservice.gettrainsourceedit(editid).subscribe(
                res => {
                    this.spinning = false;
                    this.assignmentedit(res)
                },
                err => {
                    this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )

        }
    }
    // 培训类型管理编辑
    traintypeedit(res) {
        this.validateForm = this.fb.group({
            name: [res.name, [Validators.required]],
            description: [res.description],
            parent: [res.parent, [Validators.required]],
            billingType: [res.billingType],
            weight: [res.weight]
        })
    }
    // 编辑进行表单赋值
    assignmentedit(res) {
        // console.log(res, 22)
        this.validateForm = this.fb.group({
            name: [res.name, [Validators.required]],
            parent: [res.parent, [Validators.required]],
            description: [res.description],
        })
    }
    // 表单的清除
    submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }

        if (this.editid) {
            this.editcategorysubmit(this.editid, value);
        } else {
            this.createcategroysubmit(value);
        }

        // console.log(value);
    };

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    //  验证名称的字数
    changename(event) {
        // console.log(event)
        if (event && event.replace(/^\s*|\s*$/g, '').length > 50) {
            let nameValue = event.slice(0, 50);
            this.validateForm.get('name').setValue(nameValue)
            return this.tipMessage('error', '培训名称字数不可以超过50字！', 3000);
        }
    }
    changeDiscription(event) {
        if (event && event.replace(/^\s*|\s*$/g, '').length > 500) {
            let nameValue = event.slice(0, 500);
            this.validateForm.get('description').setValue(nameValue)
            return this.tipMessage('error', '描述内容字数不可以超过500字！', 3000);
        }
    }
    // 创建分类提交表单验证珍
    createcategroysubmit(value) {
        console.log(value);
        if (this.typename == 'fc' && !this.validateForm.invalid) {
            let parentid = value.parent && value.parent.id;
            let params = {
                ...value,
            }
            delete params.parent;
            if (parentid) {
                params['parent'] = { id: parentid }
            }
            if (value.name.length > 50) {
                return this.tipMessage('error', '培训名称字数不可以超过50字！');
            }
            if (value.description && value.description.replace(/^\s*|\s*$/g, '').length > 500) {
                return this.tipMessage('error', '描述内容字数不可超过500', 3000);
            }
            this.btnstate = true;
            this.hourservice.addtraintype(params).subscribe(
                res => {
                    // console.log(res);
                    this.btnstate = false;
                    this.tipMessage('success', '创建分类成功');
                    this.route.navigate(['/classhour/hourconfiguration/traintypename'])
                },
                err => {
                    this.btnstate = false;
                    return this.tipMessage('error', err);
                }
            )
        } else {
            let parentid = value.parent && value.parent.id;
            let params = {
                ...value,
            }
            delete params.parent;
            if (parentid) {
                params['parent'] = { id: parentid }
            }

            if (this.typename == 'trainthemeadd' && !this.validateForm.invalid) {
                this.hourservice.addtraintheme(params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '创建主题成功!');
                        this.route.navigate(['/classhour/hourconfiguration/traintitem'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
            if (this.typename == 'trainchanel' && !this.validateForm.invalid) {
                this.hourservice.addtrainway(params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '创建培训方式成功!');
                        this.route.navigate(['/classhour/hourconfiguration/trainchannel'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
            if (this.typename == 'traintsource' && !this.validateForm.invalid) {
                this.hourservice.addtrainsource(params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '创建培训来源成功!');
                        this.route.navigate(['/classhour/hourconfiguration/trainsource'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
        }
    }
    // 编辑分类时的表单提交
    editcategorysubmit(id, value) {
        if (this.typename == 'fc' && !this.validateForm.invalid) {
            let parentid = value.parent && value.parent.id;
            let params = {
                ...value,
            }
            delete params.parent;
            if (parentid) {
                params['parent'] = { id: parentid }
            }
            if (value.name.length > 50) {
                return this.tipMessage('error', '培训名称字数不可以超过50字！');
            }
            if (value.description && value.description.replace(/^\s*|\s*$/g, '').length > 500) {
                return this.tipMessage('error', '描述内容字数不可超过500', 3000);
            }
            this.btnstate = true;
            this.hourservice.edittarintype(id, params).subscribe(
                res => {
                    // console.log(res);
                    this.btnstate = false;
                    this.tipMessage('success', '编辑分类成功!');
                    this.route.navigate(['/classhour/hourconfiguration/traintypename'])
                },
                err => {
                    this.btnstate = false;
                    return this.tipMessage('error', err);
                }
            )
        } else {
            let parentid = value.parent && value.parent.id;
            let params = {
                ...value,
            }
            delete params.parent;
            if (parentid) {
                params['parent'] = { id: parentid }
            }
            if (this.typename == 'trainthemeadd' && !this.validateForm.invalid) {
                this.hourservice.edittraintheme(id, params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '编辑主题成功!');
                        this.route.navigate(['/classhour/hourconfiguration/traintitem'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
            if (this.typename == 'trainchanel' && !this.validateForm.invalid) {
                this.hourservice.edittrainway(id, params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '编辑培训方式成功!');
                        this.route.navigate(['/classhour/hourconfiguration/trainchannel'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
            if (this.typename == 'traintsource' && !this.validateForm.invalid) {
                this.hourservice.edittrainsource(id, params).subscribe(
                    res => {
                        this.btnstate = false;
                        this.tipMessage('success', '编辑培训来源成功!');
                        this.route.navigate(['/classhour/hourconfiguration/trainsource'])
                    },
                    err => {
                        this.btnstate = false;
                        return this.tipMessage('error', err);
                    }
                )
            }
        }
    }
    _console(value) {
        console.log(value, '选择了层级分类');
    }
    goBackList(event) {
        if (this.showstate) {
            this.route.navigate(['/classhour/hourconfiguration/traintypename'])
        } else {
            window.history.back();
        }
        this.removelocalstorage();
    }
    // 选择方式
    choosemethod(event) {
        console.log(event, 333)
    }
    // 将数据进行分类
    categoryarray(array: any[]) {
        let optionsarray = [];
        if (array) {
            array.map((item, index) => {
                optionsarray.push({
                    value: item.id,
                    label: item.name,
                    children: item.children ? null : this.categoryarray(item.children),
                    isLeaf: item.children == undefined || item.children == null
                })
            })
        }

        return optionsarray;
    }
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }
}
