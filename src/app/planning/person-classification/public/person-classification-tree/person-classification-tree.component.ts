import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonClassificationService } from '../../service/person-classification.service';
import { Observable } from 'rxjs/Observable';
import { PersonClassification } from '../../entity/person-classification';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { async } from '@angular/core/testing';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
  selector: 'spk-person-classification-tree',
  templateUrl: './person-classification-tree.component.html',
  styleUrls: ['./person-classification-tree.component.scss']
})
export class PersonClassificationTreeComponent implements OnInit {

  @Output() selectionChange = new EventEmitter();
  
  personClassification;
  
    roots;
    config: CuiTreeConfig;
  
    constructor(private pcService: PersonClassificationService, private authService: AuthService, private message: NzMessageService) {
      authService.getCurrentSite().subscribe(site => {
        if (site) {
          this.roots = [{id: '', name: site.name, selected: true, expanded: true, hasChildren: true}];
        }
        this.initConfig();
      },
      err => {
        this.initConfig();
      }
      );
    }
  
    initConfig() {
      this.config = {
        async: {
          enable: true,
          loadChildren: (node: CuiTreeNode): Observable<any> => {
            return this.pcService.groups(node.data.id).catch(() => {
              tipMessage('树加载失败', 'warning');
              return Observable.of(null);
            });
          },
          dataFilter: (data, node: CuiTreeNode) => {
            if (!node.parent && node.data.virtual) {
              if (data && data.length > 0) {
                data[0]['selected'] = true;
              }
            }
            return data;
          }
        },
        data: {
          key: {
            id: 'id',
            label: 'name',
            children: 'children'
          }
        }
      };
    }
  
    ngOnInit() {
    }
  

  
    onSelectionChange(selection) {
      let datas = selection.map(it => it.data);
      this.selectionChange.emit(datas);
    }

}
