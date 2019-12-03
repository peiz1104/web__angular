import { Component, OnInit } from '@angular/core';
import { TrainClassAttendance } from '../../../entity/train_class_attendance';
import { TrainingClassAttendanceApiService } from '../../../service/training-class-attendance.service.';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from 'app/core';
@Component({
  selector: 'spk-training-class-attendance-edit',
  templateUrl: './training-class-attendance-edit.component.html',
  styleUrls: ['./training-class-attendance-edit.component.scss']
})
export class TrainingClassAttendanceEditComponent implements OnInit {
  trainingName: string;
  err;
  trainClassAttendance: TrainClassAttendance;

  constructor( private trainingClassAttendanceApiService: TrainingClassAttendanceApiService,
  private router: Router,
  private route: ActivatedRoute,
  private dialog: CuiLayer) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = +params['attendanceId'];
        this.loadData(id);
      }
    );

    this.route.data.subscribe(
      (obj: { trainingClass: any }) => {
        this.trainingName = obj.trainingClass.name;
      }
    );
  }

  loadData(id) {
    this.trainingClassAttendanceApiService.getOne(id).subscribe(
      FormTrainClassAttendance => {
        this.trainClassAttendance = FormTrainClassAttendance;
      }
    );
  }

  save(formTrainClassAttendance: TrainClassAttendance) {
    let fd = FormDataUtil.covert(formTrainClassAttendance);
    fd.append("id", '' + this.trainClassAttendance.id);
    this.trainingClassAttendanceApiService.updateTrainClassAttendance(fd).subscribe(
      trainBase => {
        this.dialog.msg('保存成功');
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      err => {
        this.dialog.confirm(err);
      }
    );
  }


  onSubmit(trainClassAttendance) {
    this.save(trainClassAttendance);
  }

}
