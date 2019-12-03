import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../../../../core/entity/pagination";
import {Column} from "console-ui-ng";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {TrainingClassTbcbaseService} from "../../service/training-class-tbcbase.service";

@Component({
  selector: 'spk-training-class-tbcbase-picklook',
  templateUrl: './training-class-tbcbase-picklook.component.html',
  styleUrls: ['./training-class-tbcbase-picklook.component.scss']
})
export class TrainingClassTbcbasePicklookComponent implements OnInit {
  @Output() lookPick: EventEmitter<any> = new EventEmitter();
  @Input() looktbcBaseId;
  loading: boolean;
  baseId: number;
  data: Pagination<any>;
  selection: any;


  columns: Column[] = [
    { title: '接站地点名称', data: 'locationName', styleClass: 'text-left' },
    { title: '创建人', data: 'displayName', styleClass: 'text-center' },
    { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
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
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: Pagination<any>) {
    this.loading = true;
    let params = {
      page: page ? page.number : 0,
      size: page ? page.size : 10,
      baseId: this.looktbcBaseId && this.looktbcBaseId || ''
    };


    this.trainingBaseApi.lookPick(params).subscribe(
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
