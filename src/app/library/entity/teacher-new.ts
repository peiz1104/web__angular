import { UserGroup } from 'app/system/entity/user-group';
import { User } from 'app/system/entity/user';
export class Teachernew {
  id?: number;
  userGroup?: UserGroup;
  teacherNo?: String;
  user?: User;
  name?: String;
  email?: String;
  phoneNumber?: String;
  sex?: String;
  sexString?: String;
  birthday?: string;
  teacherType?: String;
  rank?: String;
  dept?: String;
  post?: String;
  star?: String;
  qualifications?: String;
  inductionTime?: String;
  startDate?: String;
  classHour?: String;
  avgScore?: String;
  schoolName?: String;
  graduationTime?: String;
  major?: String;
  education?: String;
  degree?: String;
  url?: String;
  description?: String;
  userGroupName?: String;
  fileName?: String;
  channel?: String; // 渠道
}
