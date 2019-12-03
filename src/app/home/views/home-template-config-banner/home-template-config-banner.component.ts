import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Banner } from './../../entity/banner';
import { Observable } from 'rxjs/Observable';
import { SortablejsOptions } from 'angular-sortablejs';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    FormArray
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
declare let $: any;


@Component({
    selector: 'spk-config-banner',
    templateUrl: './home-template-config-banner.component.html',
    styleUrls: ['./home-template-config-banner.component.scss']
})
export class HomeTemplateConfigBannerComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

    @Input() id: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    moduleInfo: any;
    bannerInfo: Banner[];
    validateForm: FormGroup;
    isCite: boolean = false;
    saveLoading: boolean = false;

    bannerList: any;
    columns;
    loading: boolean = false;
    selection: any;

    constructor(
        private templateService: HomeTemplateApiService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        // console.log($('#example-lcolor'))
        this.templateService.configInfoAll.forEach(e => {
            if (e.id == this.id) {
                this.moduleInfo = { ...e };
                this.bannerInfo = this.moduleInfo.itemInfo ? [...this.moduleInfo.itemInfo] : [];
                this.createForm();
            }
        });
        this.columns = [
            { title: '图片', tpl: 'imgTpl', styleClass: 'text-center' },
            { title: '标题', data: 'name', styleClass: 'text-center' },
            { title: '链接地址', data: 'link', styleClass: 'text-center' }
        ];
    }


    ngOnChanges() {
    }

    ngAfterViewInit() {
        let self = this;
        $('.example-lcolor').each((index, value, item) => {
            // console.log(index, value, item, 4444);
            $(value).colpick({
                submitText: '确定',
                colorScheme: 'dark',
                style: {
                    'z-index': 1003,
                    'top': 290
                },
                onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                    $(el).val('#' + hex);
                    // console.log(self.validateForm, this.secretLairs);
                    // self.secretLairs.controls[index].leftColor = '#' + hex;
                    self.validateForm.value.secretLairs[index].leftColor = '#' + hex;
                    $(el).colpickHide();
                }
            });
        })
        $('.example-rcolor').each((index, value) => {
            $(value).colpick({
                submitText: '确定',
                colorScheme: 'dark',
                style: {
                    'z-index': 1003,
                    'top': 290
                },
                onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                    $(el).val('#' + hex);
                    self.validateForm.value.secretLairs[index].rightColor = '#' + hex;
                    $(el).colpickHide();
                }
            });
        })
    }
    ngAfterViewChecked() {
        let self = this;
        $('.example-lcolor').each((index, value, item) => {
            // console.log(index, value, item, 4444);
            $(value).colpick({
                submitText: '确定',
                colorScheme: 'dark',
                style: {
                    'z-index': 1003,
                    'top': 290
                },
                onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                    $(el).val('#' + hex);
                    self.validateForm.value.secretLairs[index].leftColor = '#' + hex;
                    $(el).colpickHide();
                }
            });
        })
        $('.example-rcolor').each((index, value) => {
            $(value).colpick({
                submitText: '确定',
                colorScheme: 'dark',
                style: {
                    'z-index': 1003,
                    'top': 290
                },
                onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                    $(el).val('#' + hex);
                    self.validateForm.value.secretLairs[index].rightColor = '#' + hex;
                    $(el).colpickHide();
                }
            });
        })
    }
    httpValidator = (control: FormControl): { [s: string]: boolean } => {
        const HTTP_REGEXP = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        if (!control.value) {
            return { required: true }
        } else if (!HTTP_REGEXP.test(control.value)) {
            return { error: true, link: true };
        }
    };
    // 站内banner
    createForm() {
        this.validateForm = this.fb.group({
            secretLairs: this.fb.array([]),
        });
        const bannerFGs = this.bannerInfo.map(banner => {
            let itemFg = this.fb.group(banner);
            itemFg.get('link').setValidators([this.httpValidator]);
            itemFg.get('imageUrl').setValidators([Validators.required]);
            itemFg.get('name').setValidators([Validators.required]);
            itemFg.get('name').setAsyncValidators(this.trimAsyncValidator);
            return itemFg;
        });
        const bannerFormArray = this.fb.array(bannerFGs);
        this.validateForm.setControl('secretLairs', bannerFormArray);
    }
    trimAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ required: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    get secretLairs(): FormArray {
        return this.validateForm.get('secretLairs') as FormArray;
    };
    getFormControl(fb, name) {
        return fb.controls[name];
    }
    onImgUpload(image, item) {
        item.controls['imageUrl'].setValue(image.relativePath);
    }
    // 添加banner
    addBanner(item?: any) {
        let order = this.getMaxOrder();
        let banner = {
            name: '',
            imageUrl: '',
            link: '',
            leftColor: '#fefefe',
            rightColor: '#fefefe'
        }
        let itemObj;
        if (item) {
            if (!item.leftColor && !item.rightColor) {
                itemObj = {
                    name: item.name,
                    imageUrl: item.imageUrl,
                    link: item.link,
                    leftColor: '#fefefe',
                    rightColor: '#fefefe'
                }
            } else if (item.leftColor && !item.rightColor) {
                itemObj = {
                    name: item.name,
                    imageUrl: item.imageUrl,
                    link: item.link,
                    leftColor: item.leftColor,
                    rightColor: '#fefefe'
                }
            } else if (!item.leftColor && item.rightColor) {
                itemObj = {
                    name: item.name,
                    imageUrl: item.imageUrl,
                    link: item.link,
                    leftColor: '#fefefe',
                    rightColor: item.rightColor
                }
            } else if (item.rightColor && item.leftColor) {
                itemObj = {
                    name: item.name,
                    imageUrl: item.imageUrl,
                    link: item.link,
                    leftColor: item.leftColor,
                    rightColor: item.rightColor
                }
            }
        }
        // console.log(itemObj, banner);
        let itemFg = this.fb.group(itemObj || banner);
        itemFg.get('link').setValidators([this.httpValidator]);
        itemFg.get('imageUrl').setValidators([Validators.required]);
        itemFg.get('name').setValidators([Validators.required]);
        itemFg.get('name').setAsyncValidators(this.trimAsyncValidator);
        this.secretLairs.push(itemFg);
    }
    getMaxOrder() {
        let bList = this.validateForm.value.secretLairs;
        if (bList.length > 0) {
            return bList[bList.length - 1].displayOrder + 1;
        }
        return 0;
    }
    // 删除banner
    deleteBanner(index) {
        this.secretLairs.removeAt(index);
    }

    // 选择内部本有的banner
    addCite() {
        this.isCite = true;
        this.bannerList = [];
        this.loadData();
    }
    loadData() {
        this.loading = true;
        let params = {
            page: this.bannerList.number || 0,
            size: this.bannerList.size || 5,
        };
        let arrId = [];
        this.bannerInfo.forEach(e => {
            if (e.id) {
                arrId.push(e.id)
            }
        });
        this.templateService.getBannerList(this.id, arrId, params).subscribe(
            obj => {
                this.bannerList = obj;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        )
    }
    // 关闭弹出层
    handleCancel() {
        this.isCite = false;
    }

    isOk() {
        if (this.selection) {
            this.isCite = false;
            this.selection[0].displayOrder = this.getMaxOrder();
            this.addBanner(this.selection[0]);
        } else {
            tipMessage('请至少选择一项');
        }
    }
    onBack() {
        this.back.emit()
    }

    save() {
        // tslint:disable-next-line:forin
        for (const i in this.secretLairs.controls) {
            // tslint:disable-next-line:forin
            for (const j in this.secretLairs.controls[i]['controls']) {
                this.secretLairs.controls[i]['controls'][j].markAsDirty();
            }
        }
        if (this.secretLairs.invalid) {
            return;
        }
        this.saveLoading = true;
        // 判断是否发有空displayOrder的数据
        this.templateService.saveBanner(this.id, this.validateForm.value.secretLairs).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.saveLoading = false;
                this.refresh.emit();
            },
            error => {
                tipMessage(error);
                this.saveLoading = false;
            }
        )
    }

    initOrder(bList) {
        if (bList.length > 0) {
            if (bList[0].displayOrder == null) {
                bList.forEach((e, i) => {
                    e.displayOrder = i;
                });
            }
        }
    }

    onMoveUp(idx, banner) {
        let bList = this.validateForm.value.secretLairs;
        let formList = this.secretLairs.controls;
        if (idx > 0) {
            let order = bList[idx - 1].displayOrder;
            bList[idx - 1].displayOrder = bList[idx].displayOrder;
            bList[idx].displayOrder = order;
            this.upBanner(bList, idx);
            this.upBannerForm(formList, idx);
        }
    }

    upBanner(bList, idx) {
        let temp = bList[idx - 1];
        bList[idx - 1] = bList[idx];
        bList[idx] = temp;
    }

    upBannerForm(formList, idx) {
        let temp = formList[idx - 1];
        formList[idx - 1] = formList[idx];
        formList[idx] = temp;
    }

    onMoveDown(idx) {
        let bList = this.validateForm.value.secretLairs;
        let formList = this.secretLairs.controls;
        let len = bList.length;
        if (idx != len - 1) {
            let order = bList[idx + 1].displayOrder;
            bList[idx + 1].displayOrder = bList[idx].displayOrder;
            bList[idx].displayOrder = order;
            this.downBanner(bList, idx);
            this.downBannerForm(formList, idx);
        }
    }
    downBanner(bList, idx) {
        let temp = bList[idx + 1];
        bList[idx + 1] = bList[idx];
        bList[idx] = temp;
    }
    downBannerForm(formList, idx) {
        let temp = formList[idx + 1];
        formList[idx + 1] = formList[idx];
        formList[idx] = temp;
    }
}
