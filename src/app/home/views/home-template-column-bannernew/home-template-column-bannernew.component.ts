import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';

@Component({
  selector: 'spk-home-template-column-bannernew',
  templateUrl: './home-template-column-bannernew.component.html',
  styleUrls: ['./home-template-column-bannernew.component.scss']
})
export class HomeTemplateColumnBannernewComponent implements OnInit, OnChanges {

  @ViewChild('carousel') carousel: any;
  @Input() itemConfig?: any;
  @Output() isLoad = new EventEmitter<any>();
  bannerInfo: any;
  carouselCurrentIndex: number = 0;
  getLeftRightColor: any = {};
  loading: boolean = false;
  constructor(
    private templateService: HomeTemplateApiService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.templateService.getBannerInfo(this.itemConfig.id).subscribe(
      obj => {
        this.bannerInfo = obj;
        this.getcolor();
        this.templateService.configInfoAll.forEach(e => {
          if (e.id == this.itemConfig.id) {
            e.itemInfo = obj;
          }
        });
        this.loading = false;
        this.isLoad.emit(true);
      },
      err => {
        this.loading = false;
        this.isLoad.emit(true);
      }
    )
  }
  getAfterIndex(index: number) {
    this.carouselCurrentIndex = index;
    this.getcolor();
  }
  // 获取banner左右的填充色
  getcolor() {
    if (this.bannerInfo.length) {
      this.getLeftRightColor = this.bannerInfo[this.carouselCurrentIndex];
    } else {
      this.getLeftRightColor = {};
    }
  }
}
