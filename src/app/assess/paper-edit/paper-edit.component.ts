import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paper } from '../paper.model';
import { PaperService } from '../paper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-edit',
    templateUrl: './paper-edit.component.html',
    styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit {

    dataForm: FormGroup;
    paper: Paper;
    @Input() paperId: number;
    @Input() outSide?: boolean;
    @Input() trainingId?: number;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    isLoading: boolean = false;

    constructor(private paperService: PaperService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.paper = new Paper();
        this.route.params.subscribe(
            (params: Params) => {
                this.paper.id = this.paperId || params['id'] as number;
                this.initForm();
            });
    }

    private initForm() {
        this.dataForm = this.fb.group({
            'name': ['', Validators.required],
            'description': ['', null],
            'startDate': ['', null],
            'endDate': ['', null],
            'isAnonymous': ['', null]
        });

        if (this.paper.id) {
            this.paperService.get(this.paper.id).subscribe(paper => {
                this.paper.id = paper.id;
                this.paper.name = paper.name;
                this.paper.description = paper.description;
                this.dataForm.patchValue(paper);
            });
        }
    }

    onSubmit() {
        this.isLoading = true;
        this.paper.name = this.dataForm.value['name'];
        this.paper.description = this.dataForm.value['description'];
        if (!this.paper.name.trim().length) {
            tipMessage('问卷名称不能为空');
        } else {
            if (this.paper.id) {
                this.paperService.edit(this.paper).subscribe(
                    assess => {
                        tipMessage('保存成功', 'success');
                        if (!this.outSide) {
                            this.onCancel();
                        }
                        this.isLoading = false;
                    }
                );
            } else {
                this.paperService.add(this.paper).subscribe(
                    assess => {
                        tipMessage('保存成功', 'success');
                        this.onCancel();
                        this.isLoading = false;
                    }
                );
            }
        }
    }
    onCancel() {
        this.router.navigate([this.paper.id ? '../../' : '../'], { relativeTo: this.route });
    }


}
