import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UgcActivityVote } from './../../../../entity/ugc-activity-vote';
import { UgcActivityVoteService } from './../../../../service/ugc-activity-vote.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { UgcActivity } from '../../../../entity/ugc-activity';

@Component({
    selector: 'spk-ugc-activity-vote-edit',
    templateUrl: './ugc-activity-vote-edit.component.html',
    styleUrls: ['./ugc-activity-vote-edit.component.scss']
})
export class UgcActivityVoteEditComponent implements OnInit {
    ugcActivity: UgcActivity;
    validateForm: FormGroup;
    vote: UgcActivityVote;
    @Input() voteId: number;
    @Input() activityId: number;
    @Input() outSide?: boolean;
    @Input() trainingId?: number;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    isLoading: boolean = false;


    _voteType = [
        { value: 'USER_ONCE', label: '每人只能投一次', disabled: false },
        { value: 'USER_ONCE_EVERYDAY', label: '每人每天可以投一次', disabled: false },
    ];

    constructor(private activityVoteService: UgcActivityVoteService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.vote = new UgcActivityVote();
        // this.route.params.subscribe(
        //     (params: Params) => {
        //         this.vote.id = this.voteId || params['id'] as number;
        //         this.activityId = this.activityId ? this.activityId : params['activityId'] as number;
        //         this.initForm();
        //     });
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.vote.id = this.voteId || data.ugcActivity.voteId;
            this.activityId = this.activityId ? this.activityId : data.ugcActivity.id;
            this.initForm();
        })
    }

    private initForm() {
        this.validateForm = this.fb.group({
            'title': ['', Validators.required],
            'startDate': ['', Validators.required],
            'endDate': ['', Validators.required],
            'type': ['USER_ONCE'],
            'maxChoice': [0],
            'isAll': [false]
        });

        if (this.vote.id) {
            this.activityVoteService.get(this.activityId, this.vote.id).subscribe(vote => {
                this.vote  = vote;
                this.validateForm.patchValue(vote);
            });
        }
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }
    onSubmit() {
        this.isLoading = true;
        this.vote.title = this.validateForm.value['title'];
        this.vote.startDate = this.validateForm.value['startDate'];
        this.vote.endDate = this.validateForm.value['endDate'];
        this.vote.type = this.validateForm.value['type'];
        this.vote.maxChoice = this.validateForm.value['maxChoice'];
        this.vote.isAll = this.validateForm.value['isAll'];
        if (this.validateForm.invalid) {
            return;
        }
        if (!this.vote.title.trim().length) {
            this.message.error('标题不能为空');
        } else {
            if (this.vote.id) {
                this.activityVoteService.edit(this.activityId, this.vote).subscribe(
                    assess => {
                        this.message.success('保存成功');
                        this.onCancel();
                        this.isLoading = false;
                    }
                );
            } else {
                this.activityVoteService.add(this.activityId, this.vote).subscribe(
                    assess => {
                        this.message.success('保存成功');
                        this.onCancel();
                        this.isLoading = false;
                        this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
                    }
                );
            }
        }
    }
    onCancel() {
        this.router.navigate([this.vote.id ? '../../' : '../'], { relativeTo: this.route });
    }


}
