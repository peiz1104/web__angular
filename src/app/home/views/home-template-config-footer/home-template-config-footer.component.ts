import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Observable } from 'rxjs/Observable';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-config-footer',
    templateUrl: './home-template-config-footer.component.html',
    styleUrls: ['./home-template-config-footer.component.scss']
})
export class HomeTemplateConfigFooterComponent implements OnInit {

    @Input() id: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    validateForm: FormGroup;
    moduleInfo: any;
    footerInfo: any;
    saveLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private templateService: HomeTemplateApiService,
    ) {
    }

    ngOnInit() {
        this.templateService.configInfoAll.forEach(e => {
            if (e.id == this.id) {
                this.moduleInfo = { ...e };
                this.footerInfo = e.itemInfo ? { ...e.itemInfo } : {};
            }
        });
        this.initForm();
    }
    initForm() {
        let m = this.footerInfo || {};
        this.validateForm = this.fb.group({
            hotline: [m && m.hotline, [Validators.required], this.trimAsyncValidator],
            wchart: [m && m.wchart, [Validators.required], this.trimAsyncValidator],
            wchartImg: [m && m.wchartImg, [Validators.required]],
            app: [m && m.app, [Validators.required], this.trimAsyncValidator],
            appImg: [m && m.appImg, [Validators.required]],
        });
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
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
    }
    onWechatUpload(image) {
        if (image) {
            this.getFormControl('wchartImg').setValue(image.relativePath);
        }
    }
    onApptUpload(image) {
        if (image) {
            this.getFormControl('appImg').setValue(image.relativePath);
        }
    }
    onBack() {
        this.back.emit()
    }
    save() {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.footerInfo = {
            ...this.footerInfo,
            hotline: this.validateForm.value.hotline,
            wchart: this.validateForm.value.wchart,
            wchartImg: this.validateForm.value.wchartImg,
            app: this.validateForm.value.app,
            appImg: this.validateForm.value.appImg,
            logo: ''
        }
        this.saveLoading = true;
        return this.templateService.saveFooter(this.id, this.footerInfo).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.refresh.emit();
                this.saveLoading = false;
            },
            error => {
                tipMessage('保存失败');
                this.saveLoading = false;
            }
        )
    }

}
