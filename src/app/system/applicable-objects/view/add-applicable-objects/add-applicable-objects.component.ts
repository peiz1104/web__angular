import { Component, OnInit } from '@angular/core';
import {ApplicableObjects} from "../../entity/applicable-objects";
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicableObjectsService} from "../../service/applicable-objects.service";
import {tipMessage} from "app/account/entity/message-tip";

@Component({
  selector: 'spk-add-applicable-objects',
  templateUrl: './add-applicable-objects.component.html',
  styleUrls: ['./add-applicable-objects.component.scss']
})
export class AddApplicableObjectsComponent implements OnInit {
  applicableObjects: ApplicableObjects = new ApplicableObjects();
  selectedMultipleOption;
  constructor(private router: Router,
                  private route: ActivatedRoute,
                  private applicableObjectsService: ApplicableObjectsService) { }

  ngOnInit() {
  }

  doSubmit(event) {
    console.log(this.applicableObjects);
    this.applicableObjectsService.create(this.applicableObjects).subscribe(
      ok => {
        tipMessage('添加适用对象成功','success');
        this.toList();
      },
      err => {
        tipMessage(`添加适用对象失败:`,'',2000);
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
