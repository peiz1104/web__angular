import { DocumentInfo } from './document-info';
import { Teacher } from 'app/library/entity/teacher';



export class EmploymentDocuments {
  id: number;
  docName: string;
  summary: string;
  documentInfo: DocumentInfo;
  teacher: Teacher;

}
