import { BehaviorSubject } from 'rxjs';

export type MonacoTreeElement = {
  name: string;
  fullPath: string;
  content?: MonacoTreeElement[];
  edited?: boolean;
  rename?: BehaviorSubject<boolean>;
};
