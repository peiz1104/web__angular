import { PortalBanner } from './../../entity/porttal-banner';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PortalBannerApiService } from './../../service/portal-banner-api.service';
import { NzMessageService } from 'ng-zorro-antd';
declare let $: any;
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-portal-banner-list',
    templateUrl: './portal-banner-list.component.html',
    styleUrls: ['./portal-banner-list.component.scss']
})
export class PortalBannerListComponent implements OnInit, AfterViewInit, AfterViewChecked {

    banners: PortalBanner[];
    loading: boolean;

    constructor(
        private portalBannerService: PortalBannerApiService,
        private message: NzMessageService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading = true;
        this.portalBannerService.getAllOfPage().subscribe(
            data => {
                this.banners = data.content;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
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
                    self.banners[index].leftColor = '#' + hex;
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
                    self.banners[index].rightColor = '#' + hex;
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
                    self.banners[index].leftColor = '#' + hex;
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
                    self.banners[index].rightColor = '#' + hex;
                    $(el).colpickHide();
                }
            });
        })
    }

    updateBanner(banner) {
        if (this.bannerValid(banner)) {
            if (banner.id) {
                this.portalBannerService.update(banner).subscribe(
                    ok => {
                        tipMessage('保存成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('保存失败');
                    }
                );
            } else {
                this.portalBannerService.create(banner).subscribe(
                    ok => {
                        tipMessage('保存成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('添加图片失败');
                    }
                );
            }
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
        tipMessage('请输入正确的链接地址');
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
        if (banner.id) {
            this.portalBannerService.delete(banner.id).subscribe(
                ok => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('删除失败', 'error');
                }
            );
        } else {
            this.banners.pop();
        }
    }

    addBanner() {
        this.banners.push({
            name: '',
            link: '',
            backgroundColor: '',
            leftColor: '#fefefe',
            rightColor: '#fefefe'
        });
    }

    onImageUpload(event, banner?: PortalBanner) {
        banner.imageUrl = event[0].relativePath;
    }

}
