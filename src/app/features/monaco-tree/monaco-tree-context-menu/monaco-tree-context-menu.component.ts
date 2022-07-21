import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NotificationService } from 'src/app/core/core.module';
import { IMAGE_EXTENSION } from '../../../core/Image/image-extension';
import { CodeSocketService } from '../../code-editor-v2/services/code-socket.service';
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
  @Input() contextMenuIsShow = true;
  @ViewChild('uploadInput') public uploadInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  @Output() createImage = new EventEmitter<{ path: string; name: string }>();

  isProcessRequest = false;

  readonly imageExtensionWithPoint = IMAGE_EXTENSION.map(
    (extension) => '.' + extension
  );

  readonly acceptedFileExtensionsImage: string;

  constructor(
    private eRef: ElementRef,
    private notificationService: NotificationService,
    private codeSocketService: CodeSocketService,
    private cd: ChangeDetectorRef
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
    if (!selectedFiles || !this.isImageFileExtension(selectedFiles[0].name)) {
      this.notificationService.error(
        'Nous ne supportons que les fichier jpeg, jpg et png'
      );
    } else {
      console.log('on process la request');

      this.isProcessRequest = true;
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
          // TODO régler problème de loader
          this.isProcessRequest = false;
          this.top = undefined;
          this.left = undefined;
        }
        const elementUplaod = this.elements.find(
          (element) =>
            element.type === 'element' && element.name === 'Upload picture'
        );
        if (elementUplaod?.type === 'element') {
          this.createImage.emit({
            path: this.row.fullPath,
            name: selectedFiles[0].name
          });
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
