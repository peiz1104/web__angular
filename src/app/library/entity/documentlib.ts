import { Condition } from './../../learning/offering/entity/condition';
import { DocumentInfo } from './document-info';
import { Category } from './../../system/category/entity/category';
import { UserGroup } from "app/system/entity/user-group";


export class Documentlib {
  id: number;
  name: string;
  userGroupName: string;
  userGroupId: number;
  categoryName: string;
  categoryId: number;
  isExcellent: boolean;
  isPublished: boolean;
  summary: string;
  documentInfo: DocumentInfo;
  // documentInfoTranscodeStatus: string;
  requiredCondition: Condition;
  userGroupTemp?: UserGroup;
  categoryTemp?: Category;
}
