import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Image } from '../../entity/image';
import { ImageService } from '../../service/image.service';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';


@Component({
  selector: 'spk-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  image: Image;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let imageId = +params['id'];
        this.loadData(imageId);
      }
    );
  }

  loadData(imageId) {
    this.imageService.get(imageId).subscribe(
      image => this.image = image
    );
  }

  save(formImage: Image) {
    console.log(formImage)
    let fd = FormDataUtil.covert(formImage);
    fd.append("id", '' + this.image.id);
    this.imageService.update(fd).subscribe(
      image => {
        this.layer.msg('保存成功');
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
    );
  }

  onSubmit(image) {
    this.save(image);
  }

}
