import { Component, OnInit } from '@angular/core';
import { Image } from '../../entity/image';
import { ImageService } from '../../service/image.service';
import { CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit {
  image: Image = new Image();
  err;

  constructor(private imageService: ImageService,
    private dialog: CuiLayer,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  save(formImage: Image) {
    formImage.imageSize = this.image.imageSize;
    formImage.url = this.image.url;
    this.imageService.add(formImage).subscribe(
      image => {
        this.dialog.msg('保存成功');
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      err => this.err = err
    );
  }

  onSubmit(image) {
    this.save(image);
  }

}
