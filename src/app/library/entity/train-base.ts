import { UserGroup } from 'app/system/entity/user-group';
export class TrainBase {
  id?: number;
  baseNo?: String;
  baseType?: String;
  baseName?: String;
  baseAddress?: String;
  baseLevel?: String;
  buildArea?: String;
  phone?: String;
  concactName?: String;
  description?: String;
  userGroup?: UserGroup;
  teacherCount?: number;
  logisticsCount?: number;
  city?: String;
  url?: String;
}
