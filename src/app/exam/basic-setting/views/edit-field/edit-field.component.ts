import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzMessageService } from 'ng-zorro-antd';
import { CuiPagination } from 'console-ui-ng';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'spk-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss']
})
export class EditFieldComponent implements OnInit {
  editObj: any;
  typeSelect = []
  validateForm: FormGroup;
  editId: any;
  isSpinning: boolean = false;
  isLoading: boolean = false;
  typeName: any;
  typeCode: any;
  radioValue: boolean = true;
  inputNum: number = 0;
  userGroupId: any;
  id: any;
  name: any;
  constructor(
    private route: Router,
    private routInfo: ActivatedRoute,
    private fb: FormBuilder,
    private basicSettingService: BasicSettingService,
    private nzMessageService: NzMessageService) {
  };
  ngOnInit() {
    this.name = this.routInfo.snapshot.queryParams["name"]
    console.log('name', this.name)
    this.routInfo.queryParams.subscribe(
      data => {
        if (!data.userGroupId) {
          this.nzMessageService.error('请先选择组织');
        }
        this.userGroupId = data.userGroupId;
      }
    )
    let groupData = {
        roomName: [null, [Validators.required], this.roomNameAsyncValidator],
        roomType: [null, [Validators.required]],
        roomAddress: [null, [Validators.required], this.roomNameAsyncValidator],
        remarks: [null],
        maximumSeat: [1, [this.maximumSeatValidator]]
      }
      // if (this.editId) {
      //     delete groupData.typeCode;
      //     delete groupData.baseCode;
      // }
    this.validateForm = this.fb.group(groupData);
    this.routInfo.params.subscribe(
      data => {
        this.id = data.id;
        // tslint:disable-next-line:no-unused-expression
        if (this.id) {
            this.basicSettingService.getRoomDetail({ id: this.id }).subscribe(
                res => {
                  this.editObj = res;
                  this.userGroupId = res.userGroupId;
                  this.name = res.groupName;
                  this.validateForm.setValue({
                    roomName: res.roomName,
                    roomType: res.roomType,
                    roomAddress: res.roomAddress,
                    remarks: res.remarks || '',
                    maximumSeat: res.maximumSeat,
                  })
                  // tslint:disable-next-line:forin
                  for (const key in this.validateForm.controls) {
                    this.validateForm.controls[key].markAsDirty();
                  }
                }
              )
        }
      }
    )
    this.basicSettingService.getDictionaries({ dicType: 'ROOM_TYPE' }).subscribe(
      res => {
        this.typeSelect = res.map(it => {
          return {
            label: it.dicName,
            value: it.dicCode
          }
        })
      }
    )
  }
  // validateConfirmType() {
  //   setTimeout(_ => {
  //     // tslint:disable-next-line:no-unused-expression
  //     this.validateForm.controls['typeCode'] && this.validateForm.controls['typeCode'].updateValueAndValidity();
  //   })
  // }
  roomNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      if (control.value.trim() == '') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  // 容量表格限制
  maximumSeatValidator = (control: FormControl): any => {
    const CODE_REGEXP = /^[0-9]*$/;
    if (!control.value) {
      return { required: true }
    } else if (!CODE_REGEXP.test(control.value)) {
      return { error: true, mismatch: true };
    } else if (control.value.length > 6) {
      return { error: true, maxlength: true }
    }
  }
  typeNameBlur() {
    let params = {
      roomName: this.validateForm.value.roomName,
      userGroupId: this.userGroupId,
      id: this.id
    }
    // tslint:disable-next-line:no-unused-expression
    params.roomName && this.basicSettingService.checkRoomName(params).subscribe(data => {
      return {}
    }, error => {
      const roomName = this.validateForm.controls['roomName'];

      roomName.setErrors({
        "notUnique": true,
        error: true
      })

    })
  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.validateForm.valid) {
      this.isLoading = true
      let params = {
        ...this.validateForm.value,
        userGroupId: this.userGroupId
      };
      if (this.id) {
        params = {
          ...params,
          id: this.id,
        };
        this.basicSettingService.updateRoom(params).subscribe(
          data => {
            this.nzMessageService.success('操作成功!');
            this.isLoading = false;
            this.reset($event);
          })
      } else {
        params = {
          ...params,
        };
        this.basicSettingService.addInationRoom(params).subscribe(
          data => {
            this.nzMessageService.success('操作成功!');
            this.isLoading = false;
            this.reset($event);
          },
          error => {
            this.nzMessageService.error(error);
            this.isLoading = false
          }
        );
      }
    } else {
      this.nzMessageService.error('请完善信息！');
    }
  };
  reset($event) {
    $event.preventDefault();
    this.route.navigate([`/exam/basic-setting/set`, { tabIndex: 3, id: this.userGroupId, name: this.name }])
  }
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }
  descInput = ($event) => {
    this.inputNum = $event.length;
  }
}
