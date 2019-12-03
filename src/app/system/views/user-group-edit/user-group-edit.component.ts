import { Component, OnInit, Input } from '@angular/core';
import { UserGroup } from '../../entity/user-group';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from '../../service/user-group.service';
import { CurrentUserGroup } from '../user-group-manage-index/user-group-manage-index.component';

@Component({
  selector: 'spk-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.scss']
})
export class UserGroupEditComponent implements OnInit {
  userGroup: UserGroup;
  err;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ugService: UserGroupService,
    private currentUserGroup: CurrentUserGroup
  ) { }

  ngOnInit() {
    this.currentUserGroup.isFold = true;

    this.route.data.subscribe((data: { userGroup: UserGroup, activedGroup: UserGroup }) => {
      this.userGroup = data.userGroup;
    });
  }

  onSubmit(userGroup: UserGroup) {
    this.loading = true;
    this.ugService.update(userGroup).subscribe(
      ug => {
        this.loading = false;
        this.currentUserGroup.ugTree.refresh(ug);
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        this.err = err;
      }
    );
  }

}
