import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { NonlicetWord } from '../../entity/nonlicetWord';
import { NzModalService } from 'ng-zorro-antd';
import { NonlicetWordService } from '../../service/nonlicet-word.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-nonlice-word',
    templateUrl: './nonlice-word.component.html',
    styleUrls: ['./nonlice-word.component.scss']
})
export class NonliceWordComponent implements OnInit {

    nonlicetWords: Pagination<NonlicetWord>;
    page: Pagination<NonlicetWord>;
    selection: NonlicetWord[];

    word: string;

    size: number = 10;
    loading: boolean = true;
    columns: Column[];


    constructor(
        private nonlicetWordService: NonlicetWordService,
        private modal: NzModalService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.columns = [
            { title: 'ID', data: 'id' },
            { title: '过滤词', data: 'word' },
            { title: '操作', tpl: 'rowAction', styleClass: 'text-right' },

        ];
        this.searchTopic();
    }

    loadData(page?: Pagination<NonlicetWord>) {
        this.size = page.size;
        this.searchTopic(page);
    }

    searchTopic(page?) {
        this.loading = true;
        page = page ? page : { "size": this.size, "number": 0 };
        this.nonlicetWordService.getAllOfPage(this.getSearchParams(), page).subscribe(
            ok => {
                this.nonlicetWords = ok;
                this.loading = false;
                this.selection = [];
            }
        );
    }

    getSearchParams() {
        if (this.word) {
            let params = {};
            params['word'] = this.word;
            return params;
        }
    }

    delete(nonlicetWord?: NonlicetWord, single_flag?: boolean) {
        let selected = nonlicetWord ? [nonlicetWord] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要删除的过滤词`, 'warning');
            return;
        }
        if (single_flag) {
            this.nonlicetWordService.delete(selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`删除成功`, 'success');
                    this.page = this.nonlicetWords;
                    this.loadData(this.page);
                },
                err => tipMessage(`删除失败`, 'error')
            );
        } else {
            this.modal.confirm({
                title: `确定要删除选中的过滤词吗？`,
                onOk: () => {
                    this.nonlicetWordService.delete(selected.map(it => it.id)).subscribe(
                        ok => {
                            tipMessage(`删除成功`, 'success');
                            this.page = this.nonlicetWords;
                            this.loadData(this.page);
                        },
                        err => tipMessage(`删除失败`)
                    );
                }
            });
        }
    }

    // tslint:disable-next-line:member-ordering
    isVisibleMiddle: boolean = false;
    // tslint:disable-next-line:member-ordering
    dataForm: FormGroup;
    // tslint:disable-next-line:member-ordering
    showErr: boolean = false;

    initForm() {
        let m = new NonlicetWord();
        this.dataForm = this.fb.group({
            word: [m.word, Validators.required],
        });
    }

    showModalMiddle = () => {
        this.isVisibleMiddle = true;
        this.initForm();
    };

    getFormControl(name) {
        return this.dataForm.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this.dataForm.controls)) {
            this.dataForm.controls[key].markAsDirty();
        }
    }

    handleOkMiddle = (e) => {
        this.markAsDirty();
        if (this.dataForm.invalid) {
            return;
        }
        this.nonlicetWordService.save(this.dataForm.value).subscribe(
            ok => {
                tipMessage("添加成功", 'success');
                this.searchTopic();
            },
            err => {
                tipMessage("添加失败");
                this.searchTopic();
            }
        );
        this.isVisibleMiddle = false;
    };

    handleCancelMiddle = (e) => {
        this.isVisibleMiddle = false;
    };
}
