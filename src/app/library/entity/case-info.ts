import { Condition } from './../../learning/offering/entity/condition';
import { Category } from './../../system/category/entity/category';
import { UserGroup } from "app/system/entity/user-group";
import { Site } from '../../system/entity/site';
import { DocumentInfo } from './document-info';
import { Image } from './image';

export class CaseInfo {
  id: number;
  caseCode: string;
  name: string;
  author: string;
  coverUrl: string
  endtime: Date;
  developmentUnit: string;
  source: string;
  isClassic: String;
  attachements: DocumentInfo[];
  caseFiles: DocumentInfo[];
  theme: string;
  site: Site;
  introduction: string;
  keyword: string;
  content: string;
  isPublished: String;
  isLibrary: boolean;
  userObject: string;
  // categoryName: string;
  // categoryId: number;
  // categoryInfoId: number;
  requiredCondition: Condition;
  // evaluateBoxId: number;

  userGroup?: UserGroup;
  category?: Category;
}
