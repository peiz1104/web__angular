import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Pagination} from "../../../../core/entity/pagination";
import {TrainingClassTbcbaseService} from "../../service/training-class-tbcbase.service";
import {Column} from "console-ui-ng";

@Component({
  selector: 'spk-training-class-tbcbase-wifilook',
  templateUrl: './training-class-tbcbase-wifilook.component.html',
  styleUrls: ['./training-class-tbcbase-wifilook.component.scss']
})
export class TrainingClassTbcbaseWifilookComponent implements OnInit {


  @Output() lookWifi: EventEmitter<any> = new EventEmitter();
  @Input() looktbcBaseId;
  loading: boolean;
  baseId: number;
  data: Pagination<any>;
  selection: any;

  columns: Column[] = [
    { title: 'SSID', data: 'ssid' },
    { title: 'BSSID', data: 'bssid' },
    { title: '开始时间', tpl: 'startDate' },
    { title: '结束时间', tpl: 'endDate' }
  ];

  _searchForm: FormGroup;
  _isComplexSearch: boolean = false;
  _options: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private trainingBaseApi: TrainingClassTbcbaseService
  ) { }
  ngOnInit() {
    this.loadData();
    this.initSearchForm();
  }
  initSearchForm() {
    this._searchForm = this.fb.group({
      name: [],
    });
  }
  loadData(page?: Pagination<any>) {
    this.loading = true;
    let params = {
      page: page ? page.number : 0,
      size: page ? page.size : 10,
      baseId: this.looktbcBaseId && this.looktbcBaseId || ''
    };


    this.trainingBaseApi.lookWifi(params).subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }
}
