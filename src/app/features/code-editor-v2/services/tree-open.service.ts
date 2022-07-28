import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MonacoTreeElement } from '../../monaco-tree/ngx-monaco-tree.type';

@Injectable({
  providedIn: 'root'
})
export class TreeOpenService {
  public directoryOpen: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor() {}

  addRootDirectory(tree: MonacoTreeElement[]) {
    const directories = this.directoryOpen.getValue();
    tree.forEach((element) => {
      directories.push(element.fullPath);
    });
    this.directoryOpen.next(directories);
  }

  addDirectory(directory: string) {
    const directories = this.directoryOpen.getValue();
    directories.push(directory);
    this.directoryOpen.next(directories);
  }

  removeDirectory(directory: string) {
    const directories = this.directoryOpen.getValue();
    const index = directories.indexOf(directory);
    if (index > -1) {
      directories.splice(index, 1);
    }
    this.directoryOpen.next(directories);
  }
}
