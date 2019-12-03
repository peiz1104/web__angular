import { CuiPagination, CuiLayer, Column } from 'console-ui-ng';
import { ChaZhanLocationService } from '../../service/chazhan-location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChaZhanLocation } from '../../entity/chazhan-location';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from 'app/core';
import { TrainBase } from '../../entity/train-base';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-train-location-look',
  templateUrl: './train-location-look.component.html',
  styleUrls: ['./train-location-look.component.scss']
})
export class TrainLocationLookComponent implements OnInit {
  @Output() lookOk: EventEmitter<any> = new EventEmitter();
  @Input() lookLocationId;
  data: Pagination<any>;
  loading: boolean;
  selection: any;
  searchtext;
  pagination: CuiPagination;
  chaZhanLocation: ChaZhanLocation[];
  selected: number[];
  columns;
  trainBase: TrainBase;
  isVisibile: boolean = false;
  inputValue: any;
  id: any;





  constructor(private chaZhanLocationService: ChaZhanLocationService,
    private dialog: CuiLayer,
    private router: Router,
    private message: NzMessageService,
    private route: ActivatedRoute) {
    this.columns = [
      { title: '接站地点名称', data: 'locationName', styleClass: 'text-center' },
      { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-center' },
      { title: '创建时间', data: 'createdDate', styleClass: 'text-center' },
    ];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: CuiPagination) {
    this.pagination = page;
    let params = {
      'trainBase.id': this.lookLocationId,
      locationName: this.searchtext,
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: page && page.sort ? page.sort : ''
    };
    this.loading = true;
    this.chaZhanLocationService.pageList(params).subscribe(
      pag => {
        this.pagination = pag;
        this.chaZhanLocation = pag.content;
        this.loading = false;
      }
    );
  }
  handleOk(e) {
    if (!this.inputValue) {
      tipMessage('名称必填');
      return;
    }
    const czl = new ChaZhanLocation();
    const tb = new TrainBase();
    czl.locationName = this.inputValue;
    tb.id = this.lookLocationId;
    czl.trainBase = tb;
    if (this.id) {
      czl.id = this.id;
    }

    this.chaZhanLocationService.save(czl).subscribe(
      pag => {
        this.isVisibile = false;
        this.loadData();
      }
    );
  }
  handelRouterLink() {
    this.isVisibile = true;
    this.inputValue = null;
    this.id = null;
  }

  handelCancel(e) {
    this.isVisibile = false
  }
  _console = (e) => {

  }
  onSelect(selIds: any[]) {
    this.selected = selIds;
  }

  edit(id) {
    this.isVisibile = true;
    this.chaZhanLocationService.get(id).subscribe(
      pag => {
        this.inputValue = pag.locationName;
        this.id = pag.id;
      }
    );
  }

  delete(id?) {
    let ids = id ? [id] : this.selected;
    this.dialog.confirm('确认要删除吗？',
      () => {
        this.chaZhanLocationService.delete(ids).subscribe(
          () => {
            this.dialog.msg('删除成功');
            this.loadData();
          },
          err => { this.dialog.confirm(err) }
        );
      }
    );
  }

}
