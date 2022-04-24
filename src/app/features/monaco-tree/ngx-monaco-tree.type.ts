export type MonacoTreeElement = {
  name: string;
  fullPath: string;
  content?: MonacoTreeElement[];
  edited?: boolean;
  rename?: boolean;
};
