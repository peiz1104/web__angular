import { Component, OnInit } from '@angular/core';
import { TrafficService } from './traffic.service';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-traffic',
    templateUrl: './traffic.component.html',
    styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {
    isVisible: boolean = false;
    isVisibleRefresh: boolean = false;
    inputValue: string;
    isLoading: boolean = false;
    data: any = [];
    trainingSchoolData: any;
    id: any
    constructor(
        private trafficService: TrafficService,
    ) { }

    ngOnInit() {
        this.traffic()
    }
    traffic = () => {
        this.trafficService.getTrafficList().subscribe(
            (data) => {
                console.log(data)
                this.data = data.trafficFee;
            }
        )
    }
    save = (data) => {
        this.trafficService.trafficSave(data).subscribe(
            (ok) => {
                this.isLoading = false;
                this.isVisible = false;
                this.traffic();
            }
        )
    }
    handelEdit = (item) => {
        // console.log(item)
        this.isVisible = true;
        this.trainingSchoolData = item;
        this.inputValue = item.trafficFee !== null || item.trafficFee !== undefined ? item.trafficFee : ''
    }
    handleCancel = (e) => {
        this.isVisible = false;
    }
    handleOk = (e) => {
        this.isLoading = true;
        const reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        if (reg.test(this.inputValue)) {
            let data = {
                "trainingSchool.id": this.trainingSchoolData.trainingSchoolId,
                trafficFee: this.inputValue,
                id: this.trainingSchoolData.id
            }
            this.save(data)
        } else {
            tipMessage('费用格式不正确，请输入正确的金额！', '', 4000);
            setTimeout(() => {
                this.isLoading = false;
            }, 1500)
        }

    }
    handelRefresh = (e) => {
        if (e.id || e.trafficFee) {
            this.isVisibleRefresh = true;
            this.trainingSchoolData = e;
        } else {
            tipMessage('请先填写单人往返交通费再同步');
        }
    }
    handleRefreshCancel = (e) => {
        this.isVisibleRefresh = false;
    }
    // 同步计划交通费
    handleRefreshOk = (item) => {
        console.log(this.trainingSchoolData)
        this.isVisibleRefresh = false;
        this.trafficService.updatePlanTraffic(this.trainingSchoolData.id).subscribe(
            ok => {
                tipMessage(ok.mes, 'success');
            },
            err => {
                tipMessage('同步失败');
            }
        )
    }
}
