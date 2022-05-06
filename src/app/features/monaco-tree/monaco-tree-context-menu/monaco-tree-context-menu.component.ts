import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/core.module';
import { IMAGE_EXTENSION } from '../../../core/Image/image-extension';
import { CodeSocketService } from '../../code-editor-v2/services/code-socket.service';
import { files } from '../../utils/file-icon';
import { environment } from '../../../../environments/environment';
import {
  ContextMenuElementSeparator,
  ContextMenuElementText
} from './monaco-tree-context-menu.type';

@Component({
  selector: 'monaco-tree-context-menu',
  templateUrl: './monaco-tree-context-menu.component.html',
  styleUrls: ['./monaco-tree-context-menu.component.scss']
})
export class MonacoTreeContextMenuComponent {
  @Input() top: number | undefined;
  @Input() left: number | undefined;
  @Input() row: any;
  @Input() elements: Array<
    ContextMenuElementSeparator | ContextMenuElementText
  > = [];
  @ViewChild('uploadInput') public uploadInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  readonly imageExtensionWithPoint = IMAGE_EXTENSION.map(
    (extension) => '.' + extension
  );

  readonly acceptedFileExtensionsImage: string;

  constructor(
    private eRef: ElementRef,
    private notificationService: NotificationService,
    private codeSocketService: CodeSocketService
  ) {
    this.acceptedFileExtensionsImage = this.imageExtensionWithPoint.join(', ');
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.top = -1000;
      this.left = -1000;
    }
  }

  handleClickUploadImage(selectedFiles: FileList | null | undefined) {
    console.log(selectedFiles);
    if (!selectedFiles || !this.isImageFileExtension(selectedFiles[0].name)) {
      this.notificationService.error(
        'Nous ne supportons que les fichier jpeg, jpg et png'
      );
    } else {
      const fileReader = new FileReader();
      const fileByteArray: number[] = [];
      fileReader.readAsArrayBuffer(selectedFiles[0]);
      fileReader.onloadend = (evt) => {
        if (evt?.target?.readyState === FileReader.DONE) {
          const arrayBuffer: any = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (const a of array) {
            fileByteArray.push(a);
          }
          this.codeSocketService.uploadPicture(
            fileByteArray,
            this.row.fullPath.split(environment.baseProjectPath)[1] +
              '/' +
              selectedFiles[0].name
          );
        }
      };
    }
  }

  handleUploadPicture(): void {
    this.uploadInput?.nativeElement.click();
  }

  private isImageFileExtension(filename: string): boolean {
    const fileExtension = /(\.\w+)$/.exec(filename);
    return (
      fileExtension !== null &&
      this.imageExtensionWithPoint.includes(fileExtension[1])
    );
  }
}
