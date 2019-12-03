import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { TrainBase } from '../../entity/train-base';
import { NgForm } from '@angular/forms';
import { FormDataUtil } from '../../../core';
import { TrainBaseService } from '../../service/train-base.service';

@Component({
  selector: 'spk-train-base-form',
  templateUrl: './train-base-form.component.html',
  styleUrls: ['./train-base-form.component.scss']
})
export class TrainBaseFormComponent implements OnInit {

  @Input() trainBase: TrainBase;
  @Input() isCreate: boolean;

  @Output() doSubmit = new EventEmitter();

  @ViewChild("trainBaseForm") trainBaseForm: HTMLFormElement;

  confirmPassword: string = "";
  logicShow = false;
  wShow = false;





  constructor(private trainBaseService: TrainBaseService) { }

  ngOnInit() {
    if (this.isCreate) {
      this.trainBase = new TrainBase();
      this.trainBaseService.getBaseNo().subscribe(
        res => {
            this.trainBase.baseNo = res.baseNo;
        }
      );
    }

  }

  onSubmit(f: NgForm) {
    let fd = FormDataUtil.covert(f.value);
    f.value.url = this.trainBase.url;
    if(this.isCreate){
        f.value.baseNo = this.trainBase.baseNo;
    }
    this.doSubmit.emit(f.value);
  }


  // 上传图片
  onUploadComplete(result) {
    if (result) {
      this.trainBase.url = result["relativePath"];
    }
  }


}
