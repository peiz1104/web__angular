import { Component, OnInit, Input } from '@angular/core';
import { CertificateService } from 'app/library/service/certificate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

declare let $: any;
@Component({
  selector: 'spk-drag-box',
  templateUrl: './drag-box.component.html',
  styleUrls: ['./drag-box.component.scss']
})
export class DragBoxComponent implements OnInit {
  @Input() bool: boolean = true;
  @Input() id: any;
  @Input() imgurl: any;
  cerid: any;
  data: any = [];
  viewData: any = [];
  coordinates: any = [];
  imgUrlPath: any;
  loading: boolean = false;
  constructor(
    private certificateService: CertificateService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
  }
  setDrag() {
    let window = this;
    // if (this.bool) {
    $(function () {
      $('.drag-box .drag').each(function (index) {
        $(this).myDrag({
          parent: '.test',
          randomPosition: false,
          direction: 'all',
          dragStart: function (x, y) {
          },
          dragEnd: (x, y) => {
            window.data.forEach((element, i) => {
              if (element.id == this.id) {
                window.coordinates[i] = {
                  certId: window.cerid,
                  certItemId: this.id,
                  coordinatex: x,
                  coordinatey: y,
                  fontSize: 11,
                  drag: element.drag
                };
              }
            });
          },
          dragMove: function (x, y) {
          }
        });
      });
    });
    // }
  }
  formatData(obj, index) {
    this.data[index].drag = !this.data[index].drag;
    this.setDrag();
  }

  ngOnInit() {
    this.cerid = this.activatedRoute.snapshot.params['id'] || this.id;
    let imgurl = this.activatedRoute.snapshot.params['imgUrlPath'] || this.imgurl;
    this.imgUrlPath = imgurl ? window.location.origin + imgurl : 'assets/images/logo.jpg';
    // tslint:disable-next-line:no-unused-expression
    this.cerid && this.certificateService.getOne(this.cerid).subscribe((data: any) => {
      let obj = data.certificateType.items;
      let viewobj = data.relations;
      obj.forEach((element, i) => {
        element.drag = false;
        viewobj.forEach((element2, j) => {
          if (obj[i].id == viewobj[j].certItemId) {
            element.drag = true;
            element.certId = element2.certId;
            element.certItemId = element2.certItemId;
            element.coordinatex = element2.coordinatex;
            element.coordinatey = element2.coordinatey;
            element.fontSize = element2.fontSize;
          }
        });
      });
      this.data = obj;
      this.setDrag();
    })
  }
  saveDrag() {
    this.loading = true;
    let saveobj = [];
    this.coordinates.forEach(element => {
      if (element.drag) {
        saveobj.push(
          element
        );
      }
      delete element.drag;
    });
    this.certificateService.saveCertificate(this.cerid, saveobj).subscribe(
      data => {
        this.loading = false;
        this.router.navigate([`/library/certificate`]);
      }, err => {
        this.loading = false;
      })

  }
}
