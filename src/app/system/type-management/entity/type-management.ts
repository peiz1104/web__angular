import {ProgrammanagementGroup} from "../../program-management/entity/programmanagement-group";
import {Programmanagement} from "../../program-management/entity/programmanagement";

export class TypeManagement {
  id: number;
  name: string;
  programmanagement?: Programmanagement;
  lastModifiedDate?: Date;
  createdByDisplayName?: string;
}
