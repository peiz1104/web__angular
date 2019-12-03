import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { ImageService } from 'app/library/service/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from 'app/library/entity/image';

@Component({
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

 images: Image[];
  pagination: CuiPagination;
  columns;
  loading: boolean = true;
  searchtext;
  selected: number [];

    constructor(private imageService: ImageService,
      private dialog: CuiLayer,
      private router: Router,
      private route: ActivatedRoute) {
          this.columns = [
            { title: 'ID', data: 'id' },
            { title: '名称', data: 'name' },
            { title: '所属组织', data: 'userGroup.name', visible: true }
          ];
   }

  ngOnInit() {
    this.loadData();
  }

  onSelect(selIds: any[]) {
    this.selected = selIds;
  }
    loadData(page?: CuiPagination) {
      this.pagination = page;
      let params = {
        name: this.searchtext,
        page: page ? page.number : 0,
        size: page ? page.size : '',
        sort: page && page.sort ? page.sort : ''
      };
      this.loading = true;
      this.imageService.pageList(params).subscribe(
        pag => {
          this.pagination = pag;
          this.images = pag.content;
          this.loading = false;
        }
      );

  }

    delete(id?) {
      let ids = id ? [id] : this.selected;
      this.dialog.confirm('确认要删除吗？',
        () => {
          this.imageService.delete(ids).subscribe(
            () => {
              this.dialog.msg('删除成功');
              this.loadData();
            },
            err => { this.dialog.confirm(err) }
          );
        }
      );
    }

}
