import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeachernewService } from './../../service/teachernew.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-qualification-form',
    templateUrl: './teacher-qualification-form.component.html',
    styleUrls: ['./teacher-qualification-form.component.scss']
})
export class TeacherQualificationFormComponent implements OnInit {

    @Input() teacher?: any = {
        user: {
            userName: '',
            displayName: '',
            userGroup: { id: null },
        },
        lvs: ''
    };
    @Input() isEdit?: boolean = false;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    id:number;
    validateForm: FormGroup;
    newId: number;
    constructor(
        private fb: FormBuilder,
        private teachernewService: TeachernewService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        let m = this.teacher;
        this.validateForm = this.fb.group({
            teacherNo: [m.user.displayName, [Validators.required]],
          //  teacherName: [m.user.displayName, [Validators.required]],
            userGroupId: [m.user.userGroup.name, [Validators.required]],
            lvs: [m.lv, [Validators.required]]
        });
    }


    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    _save(event) {
        this.markAsDirty();
        if (this.validateForm.invalid) {
            return;
        }
        this.loading = true;
        this.validateForm.value['userId'] = this.newId;
        if(this.id){
            this.validateForm.value['id'] = this.id;
            this.validateForm.value['isDeleted'] = false;
        }
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
    }

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    back() {
        this.cancel.emit();
    }
    userLookupOk(e) {
        this.teachernewService.isHas(e[0].id).subscribe(
            ok => {
                if (ok && null !=ok.isDeleted && !ok.isDeleted && ok.id) {
                    this.validateForm = this.fb.group({
                        teacherNo: ['', [Validators.required]],
                        teacherName: ['', [Validators.required]],
                        userGroupId: ['', [Validators.required]],
                        lvs: [null, [Validators.required]],
                    });
                    tipMessage('讲师已存在，请重新选择');
                } else {
                    this.newId = e[0].id;
                    if(ok && ok.id ){
                        this.id= ok.id;
                      }                   
                    if (e[0].userGroupName) {
                        this.validateForm = this.fb.group({
                            teacherNo: [e[0].username, [Validators.required]],
                            // teacherName: [e[0].displayName, [Validators.required]],
                            userGroupId: [e[0].userGroupName, [Validators.required]],
                            lvs: [null, [Validators.required]],
                        });
                       
                    } else {
                        this.validateForm = this.fb.group({
                            teacherNo: [e[0].username, [Validators.required]],
                            // teacherName: [e[0].displayName, [Validators.required]],
                            userGroupId: [e[0].userGroup.name, [Validators.required]],
                            lvs: [null, [Validators.required]],
                        });
                    }
                  
                }
            },
        )

    }

}
