import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseOutlineService } from './../../service/course-outline.service';
import { Course } from './../../entity/course';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  templateUrl: './rco-import.component.html',
  styleUrls: ['./rco-import.component.scss']
})
export class RcoImportComponent implements OnInit {
  course: Course;

  uploadFile;
  maxFileSize = 1024 * 1024 * 1024 * 1024;

  optionForm: FormGroup;
  locationForm: FormGroup;

  imsmanifestError;

  importLoading: boolean = false;
  importError;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private outlineService: CourseOutlineService, private message: NzMessageService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {course: Course}) => {
      this.course = data.course;
    });

    this.initOptionForm();
  }

  initOptionForm() {
    this.optionForm = this.fb.group({
      standard: ['CMI', Validators.required],
      fileUpload: [null, Validators.required],
      imsmanifest: [null]
    });
  }

  initLocationForm() {
    let titleSourceValue = this.isScorm ? '1' : '2';
    let defaultTitle = this.isScorm ? this.optionForm.controls['imsmanifest'].value[0]['title']
      : this.optionForm.controls['fileUpload'].value['originFileName'];
    let defaultTrackingType = this.isScorm ? 'CMI' : 'AUTO';

    let startingUrlValidator = this.isScorm ? null : Validators.required;

    this.locationForm = this.fb.group({
      titleSource: [titleSourceValue],
      title: [defaultTitle, Validators.required],
      startingUrl: [null, startingUrlValidator],
      trackingType: [defaultTrackingType, Validators.required]
    });

    this.locationForm.controls['titleSource'].valueChanges.subscribe(
      val => {
        switch (+val) {
          case 1:
            if (this.isScorm) {
              this.locationForm.controls['title'].setValue(this.optionForm.controls['imsmanifest'].value[0]['title']);
            } else {
              this.locationForm.controls['titleSource'].setValue('2');
            }
            break;
          case 2:
            this.locationForm.controls['title'].setValue(this.optionForm.controls['fileUpload'].value['originFileName']);
            break;
          case 3:
            this.locationForm.controls['title'].setValue(null);
            break;
          default:
            break;
        }
      }
    );
  }

  get isScorm() {
    return this.optionForm.controls['standard'].value == 'CMI';
  }

  onUploadComplete(result) {
    // console.log(result);
    this.uploadFile = result;
    if (this.optionForm.controls['standard'].value == 'CMI') {
      this.imsmanifestError = null;
      this.optionForm.controls['imsmanifest'].setValue(null);
      this.optionForm.controls['fileUpload'].setValue(null);
      this.outlineService.parseImsManifest(this.course.id, this.uploadFile).subscribe(
        imsmanifest => {
          this.optionForm.controls['imsmanifest'].setValue(imsmanifest);
          this.optionForm.controls['fileUpload'].setValue(result);
        },
        err => {
          this.imsmanifestError = '解析 imsmanifest.xml 错误，请确认课件ZIP包中根目录下存在文件名为 "imsmanifest.xml" 的文件，且格式正确。';
        }
      );
    } else {
      this.optionForm.controls['fileUpload'].setValue(result);
    }
  }

  onNext(stepIndex) {
    switch (stepIndex) {
      case 1:
        // 初始化内容位置表单
        this.initLocationForm();
        break;
      case 3:
        this.doImport();
        break;
      default:
        break;
    }
  }

  doImport() {
    let importInfo = Object.assign({}, this.optionForm.value, this.locationForm.value);
    this.importLoading = true;
    this.importError = null;
    this.outlineService.import(this.course.id, importInfo).subscribe(
      ok => {
        this.importLoading = false;
      },
      err => {
        this.importLoading = false;
        this.importError = '执行导入失败，请重试！';
      }
    );
  }

  onFinish() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {

    this.goBack()
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
