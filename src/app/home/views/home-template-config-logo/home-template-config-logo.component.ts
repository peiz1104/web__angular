import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Site } from 'app/home/entity/site';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-config-logo',
    templateUrl: './home-template-config-logo.component.html',
    styleUrls: ['./home-template-config-logo.component.scss']
})
export class HomeTemplateConfigLogoComponent implements OnInit, OnChanges {

    @Input() id: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    moduleInfo: any;
    logoInfo: any;
    navigation = new Array();
    saveLoading: boolean = false;
    constructor(
        private templateService: HomeTemplateApiService,
    ) { }

    ngOnInit() { }
    ngOnChanges() {
        this.templateService.configInfoAll.forEach(e => {
            if (e.id == this.id) {
                this.moduleInfo = e;
                this.logoInfo = { ...e.itemInfo };
                e.navigation.forEach(item => {
                    this.navigation.push({ ...item });
                });
            }
        });
    }
    onUploadComplete(result) {
        this.logoInfo.imgUrl = result[0].relativePath;
    }
    onBack() {
        this.back.emit()
    }
    save() {
        if (this.logoInfo.imgUrl) {
            this.saveLoading = true;
            return this.templateService.saveLogo(this.id, this.logoInfo, this.navigation).subscribe(
                ok => {
                    tipMessage('保存成功', 'success');
                    this.refresh.emit();
                    this.saveLoading = false;
                },
                error => {
                    tipMessage(error);
                    this.saveLoading = false;
                }
            )
        } else {
            tipMessage('请上传图片');
        }

    }

    up(row) {
        let idx = this.navigation.indexOf(row);
        let preOption = this.navigation[idx - 1];
        let displayOrder = preOption.displayOrder;
        preOption.displayOrder = row.displayOrder;
        row.displayOrder = displayOrder;
        this.navigation[idx - 1] = row;
        this.navigation[idx] = preOption;
    }

    down(row) {
        let idx = this.navigation.indexOf(row);
        let nextOption = this.navigation[idx + 1];
        let displayOrder = nextOption.displayOrder;
        nextOption.displayOrder = row.displayOrder;
        row.displayOrder = displayOrder;
        this.navigation[idx + 1] = row;
        this.navigation[idx] = nextOption;
    }

    onShow(item) {
        item.isVisible = !item.isVisible;
    }
    showName(item) {
        let html = item.isVisible ? '隐藏' : '显示';
        return html;
    }
}
