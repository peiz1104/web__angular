import { NzMessageService } from 'ng-zorro-antd';
import { AccountInfo } from './../../entity/account-info';
import { AccountService } from './../../service/account.service';
import { AccountAuthorization } from './../../entity/account-authorization';
import { Pagination } from 'app/core';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-account-authorization',
  templateUrl: './account-authorization.component.html',
  styleUrls: ['./account-authorization.component.scss']
})
export class AccountAuthorizationComponent implements OnInit {

  authorizations: Pagination<AccountAuthorization>;
  accountInfo: AccountInfo;
  loading = true;
  columns: Column[] = [
    {title: '账户', tpl: 'account'},
    {title: '所属站点', tpl: 'site'},
    {title: '对象', tpl: 'target'},
    {title: '许可', tpl: 'authorization'},
    {title: '授予者', tpl: 'created'},
  ];

  constructor(private accountService: AccountService, private message: NzMessageService) { }

  ngOnInit() {
    this.findUser();
  }

  findUser() {
    this.accountService.findUser().subscribe(
       user => {
        this.accountInfo = user;
        console.log(user);
        this.findAuthorization();
       }
     )
   }

   findAuthorization() {
    let id = this.accountInfo ? this.accountInfo.id : -1 ;
    this.accountService.findAuthorization({editId: id}, this.authorizations).subscribe(
      authorizations => {
        this.authorizations = authorizations;
        this.loading = false
      },
      err => {tipMessage(err)}
    )
   }

  //  showAuthorization(row) {
  //  return  row.privilegeName ? row.privilegeName +(角色) : row.roleName;
  //  }
   
}
