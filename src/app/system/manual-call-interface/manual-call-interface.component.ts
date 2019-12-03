import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {ManualCallInterfaceService} from "../service/manual-call-interface.service";

@Component({
    selector: 'spk-manual-call-interface',
    templateUrl: './manual-call-interface.component.html',
    styleUrls: ['./manual-call-interface.component.scss']
})
export class ManualCallInterfaceComponent implements OnInit {
    _form: FormGroup;
    btnstate: boolean = false;
    initFormData: any = {
        type: [],
        startDate: [null],
        endDate: [null],
        trainclassId: [],
        teacherId: []
    };
    userText;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private callInterfaceService: ManualCallInterfaceService
    ) { }

    initForm() {
        this._form = this.fb.group(this.initFormData)
    }
    ngOnInit() {
        this.initForm();
    }
    _saveformmessage(event, value) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        this.btnstate = true;
        console.log(value, 223)
        // 接口
      this.callInterfaceService.callInterface(value).subscribe(
        c => {
          console.log("11111111111");
          if (c.userText == 'N') {
            this.btnstate = false;
            alert("OK了！！")
          } else {
            this.btnstate = false;
            alert("参数有问题")
          }
        },
        err => { }
      );

        /*
        setTimeout((
        ) => {
            this.btnstate = false;
        }, 500)*/
    }
}
