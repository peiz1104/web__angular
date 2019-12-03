import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrainClassBanner } from 'app/training/entity/train_class_Banner';
import { TrainClassBannerApiService } from 'app/training/service/train-class-banner-api.service';
import { Offering } from '../../../../learning/offering/entity/offering';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-banner',
    templateUrl: './training-class-banner.component.html',
    styleUrls: ['./training-class-banner.component.scss']
})
export class TrainingClassBannerComponent implements OnInit {

    trainClassBanners: TrainClassBanner[];
    loading: boolean = false;
    tbcId: number;
    trainingName: string;

    constructor(
        private trainClassBannerApiService: TrainClassBannerApiService,
        public activatedRoute: ActivatedRoute,
        private modal: NzModalService) {
    }

    ngOnInit() {
        this.tbcId = this.activatedRoute.snapshot.params['tbcId'];
        this.activatedRoute.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.loadData();
    }

    loadData() {
        this.trainClassBannerApiService.getAllOfPage(this.tbcId).subscribe(
            data => {
                this.trainClassBanners = data.content;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    updateBanner(trainClassBanner) {
        let offering = {};
        offering["id"] = this.tbcId;
        trainClassBanner["offering"] = offering;
        this.loading = true;
        if (this.bannerValid(trainClassBanner)) {
            if (trainClassBanner.id) {
                this.trainClassBannerApiService.update(trainClassBanner).subscribe(
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
                this.trainClassBannerApiService.create(trainClassBanner).subscribe(
                    ok => {
                        tipMessage('保存成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('添加图片失败');
                        this.loading = false;
                    }
                );
            }
        } else {
            this.loading = false;
        }
    }

    bannerValid(trainClassBanner) {
        if (!trainClassBanner.name) {
            tipMessage('文字标题不能为空');
            return false;
            // } else if (!trainClassBanner.link) {
            //   this.message.error('链接地址不能为空');
            //   return false;
        } else if (!trainClassBanner.imageUrl) {
            tipMessage('请上传图片');
            return false;
        }
        if (trainClassBanner.link) {
            if (!this.isURL(trainClassBanner.link)) {
                tipMessage('请输入正确的链接地址');
                return false;
            }
        }
        return true;
    }
    deleteBanner(trainClassBanner) {
        this.modal.confirm({
            title: `确定要删除吗？`,
            zIndex: 1003,
            onOk: () => {
                if (trainClassBanner.id) {
                    this.trainClassBannerApiService.delete(trainClassBanner.id).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除失败');
                        }
                    );
                } else {
                    this.trainClassBanners.pop();
                }
            }
        });
    }

    addBanner() {
        this.trainClassBanners.push({
            name: '',
            link: '',
            backgroundColor: '',
        });
    }

    onImageUpload(event, trainClassBanner?: TrainClassBanner) {
        trainClassBanner.imageUrl = event[0].relativePath;
    }

    // 上移、下移
    moveBanner(bannerId, flag) {
        let desc = "";
        if ("up" == flag) {
            desc = "上移";
        } else {
            desc = "下移";
        }
        this.trainClassBannerApiService.updateOrder(this.tbcId, bannerId, flag).subscribe(
            ok => {
                tipMessage(desc + "成功", 'success');
                this.loadData();
            },
            err => {
                tipMessage(desc + "失败");
            }
        )
    }

    isURL(str_url) {// 验证url
        const HTTP_REGEXP = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return HTTP_REGEXP.test(str_url);
    }
}
