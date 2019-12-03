import {ProgrammanagementGroup} from "./programmanagement-group";

export class Programmanagement {
  id: number;
  name: string;
  programmanagermentGroup: ProgrammanagementGroup;
  description?: string;

  hasChildren?: boolean;
  parent?: Programmanagement;
  fullPath?: number[];
  pullName?: string[];
}
