import { InnerMessage } from './../../entity/inner-message';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from './../../service/message.service';
import { MessageType } from './../../entity/message-type';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Column, Message } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-inner-msg-list',
  templateUrl: './inner-msg-list.component.html',
  styleUrls: ['./inner-msg-list.component.scss']
})
export class InnerMsgListComponent implements OnInit {

  messagePage: Pagination<InnerMessage>;
  messageTypes: MessageType[];
  messageCount: number = 0;
  type: any;
  // selection: any[];
  loading: boolean = true;

  columns: Column[] = [
    { title: '标题', data: 'innerMessageTitle' },
    { title: '时间', data: 'innerMessageCreatedDate'},
    { title: '类型', data: 'innerMessageSourceType' },
  ];

  constructor(private router: Router, private route: ActivatedRoute,
    private messageService: MessageService, private message: NzMessageService) { }

  ngOnInit() {
    this.findMessageTypes();
    this.findUserMessage();

    // this.route.queryParamMap.subscribe((pm) => {
    //   console.log(pm.get("type"));
    // });

    // TODO: 待优化，此处事件监听的方式是全局的，组件加载之后就会一直存在，无法注销，会影响全局路由的性能
    this.router.events.subscribe(e => {
      // console.log(e);
      if (e instanceof NavigationEnd) {
        this.findMessageTypes();
        this.findUserMessage();
      }
    });
  }

  getParam(): any {
    let param = {};
    // this.route.queryParamMap.subscribe((pm) => {
    //   param['messageTypeKey'] = pm.get("type") ? pm.get("type") : undefined;
    // });
     this.route.paramMap.subscribe((pm) => {
      param['isRead'] = pm.get("isRead");
      this.type =  pm.get("type") ? pm.get("type") : undefined;
      param['sourceType'] = this.type;
    });

   if (param['isRead'] == 'all') {
      param['isRead'] = undefined;
    }else if (param['isRead'] == 'read') {
     param['isRead'] = true;
    }else {
      param['isRead'] = false;
    }
    return param;
  }

  findUserMessage() {
    this.loading = true;
    let param = this.getParam();
    this.messageService.getAllOfPage(param, this.messagePage).subscribe(
     messagePage => {
        this.messagePage = messagePage,
        this.loading = false;
       }
    )
  }

  findMessageTypes() {
    this.messageService.findMessagTypes().subscribe(
      types => {
         this.messageTypes = types
        },
      err => {tipMessage(err)}
     )
  }

  count(index, item) {
    this.messageCount = this.messageCount + item ? item.messageCount : 0 ;
    console.log(this.messageCount);
  }

}
