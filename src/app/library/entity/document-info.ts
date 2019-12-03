import { Category } from './../../system/category/entity/category';
import { UserGroup } from "app/system/entity/user-group";


export class DocumentInfo {
  id?: number;
  name?: string;
  format?: string;
  relativePath?: string;
  fileSize?: number;
  type?: string;
  originFileName?: string;
  isPreview?: boolean;
  indexStatus?: string;
  fullPath?: string;
  fileName?: string;
  parentDirectoryPath?: string;
  transcodeStatus?: string;
  convertImageNum?: number;
  convertImageType?: string;
  previewPath?: string;
}
