import { Banner } from './../../entity/banner';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BannerService } from './../../service/banner.service';
import { NzModalService } from 'ng-zorro-antd';
import { BannerBox } from '../../entity/banner-box';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-banner-list',
    templateUrl: './banner-list.component.html',
    styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
    @Input() box: BannerBox;
    banners: Banner[];
    loading: boolean = false;
    _current = 1;
    constructor(
        private bannerService: BannerService,
        private modal: NzModalService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.bannerService.getAllOfPage(this.box.id).subscribe(
            data => {
                this.banners = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    updateBanner(banner) {
        this.loading = true;
        if (this.bannerValid(banner)) {
            if (banner.id) {
                this.bannerService.update(banner).subscribe(
                    ok => {
                        tipMessage('保存成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('保存失败');
                        this.loading = false;
                    }
                );
            } else {
                banner.bannerBox = this.box;
                this.bannerService.create(banner).subscribe(
                    ok => {
                        tipMessage('添加成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('添加失败');
                        this.loading = false;
                    }
                );
            }
        } else {
            this.loading = false;
        }
    }

    bannerValid(banner) {
        if (!banner.name) {
            tipMessage('文字标题不能为空');
            return false;
        } else if (!banner.link) {
            tipMessage('链接地址不能为空');
            return false;
        } else if (!banner.imageUrl) {
            tipMessage('请上传图片');
            return false;
        }
        if (banner.link) {
            if (!this.isURL(banner.link)) {
                tipMessage('请输入正确的链接地址', 'error');
                return false;
            }
        }
        return true;
    }

    isURL(str_url) {// 验证url
        const HTTP_REGEXP = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return HTTP_REGEXP.test(str_url);
    }

    deleteBanner(banner) {
        this.modal.confirm({
            title: `确定要删除吗？`,
            zIndex: 1003,
            onOk: () => {
                if (banner.id) {
                    this.bannerService.delete(banner.id).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除失败');
                        }
                    );
                } else {
                    this.banners.pop();
                }
            }
        });
    }

    addBanner() {
        this.banners.push({
            name: '',
            link: '',
            backgroundColor: ''
        });
    }

    onImageUpload(event, banner?: Banner) {
        banner.imageUrl = event[0].relativePath;
    }

    moveBanner(row, operate) {
        let param = {
            sourceId: row.id,
            operate: operate
        }
        this.bannerService.moveBanner(param).subscribe(
            ok => {
                tipMessage('移动成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage(`移动失败：${err.message}`);
            }
        );
    }

}
