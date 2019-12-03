import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApplicableObjectsService} from "../../service/applicable-objects.service";
import {ApplicableObjects} from "../../entity/applicable-objects";
import {tipMessage} from "app/account/entity/message-tip"; 

@Component({
  selector: 'spk-applicable-objects-edit',
  templateUrl: './applicable-objects-edit.component.html',
  styleUrls: ['./applicable-objects-edit.component.scss']
})
export class ApplicableObjectsEditComponent implements OnInit {
  applicableObjects: ApplicableObjects = new ApplicableObjects();
  constructor(private router: Router,
                  private route: ActivatedRoute,
                  private applicableObjectsService: ApplicableObjectsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let ids = +params['id'];
        if (ids) {
          this.loadData(ids);
        }
      }
    );
  }


  loadData(ids) {
    this.applicableObjectsService.getOne(ids).subscribe(
      applicableObjects => {
        this.applicableObjects = applicableObjects;
      }
    );
  }

  doSubmit(event) {
    console.log(this.applicableObjects);
    this.applicableObjectsService.saveUpdate(this.applicableObjects).subscribe(
      ok => {
        tipMessage('修改适用对象成功','success');
        this.toList();
      },
      err => {
        tipMessage(`修改适用对象失败:`,'',2000);
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
