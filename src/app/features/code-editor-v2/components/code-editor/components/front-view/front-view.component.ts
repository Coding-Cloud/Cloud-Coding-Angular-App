import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckHealthPathService } from '../../../../services/check-health-path.service';
import { NotificationService } from '../../../../../../core/notifications/notification.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontViewComponent implements OnInit {
  @ViewChild('inputUrl') public inputUrl:
    | ElementRef<HTMLInputElement>
    | undefined;

  @ViewChild('iframeElement') public iframeElement:
    | ElementRef<HTMLIFrameElement>
    | undefined;
  @Input() url: string | undefined;
  @Input() projectUniqueName: string | undefined;
  loadingRequest$ = new BehaviorSubject(false);
  urlSee: string | undefined;
  baseUrlPathTrust: SafeResourceUrl | undefined;
  urlIsFocused = false;
  scheme: 'http://' | 'https://' | undefined = undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private checkHealthPathService: CheckHealthPathService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.url !== undefined) {
      this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.url
      );
      this.scheme = this.url.includes('http://') ? 'http://' : 'https://';
      this.urlSee = this.url.replace(this.scheme, '');
    }
  }

  handleFocus() {
    if (this.scheme && this.urlSee) {
      this.urlSee = this.scheme + this.urlSee;
    }
    this.urlIsFocused = true;
  }

  handleFocusOut() {
    this.urlSee = this.formatUrl(this.urlSee);
    this.urlIsFocused = false;
  }

  handleChange(event: any) {
    if (event.key === 'Enter' && this.projectUniqueName) {
      this.loadingRequest$.next(true);
      setTimeout(() => {
        this.loadingRequest$.next(false);
        this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
          event.target.value
        );
        this.inputUrl?.nativeElement.blur();
      }, 2000);
      //this.checkHealthPathService
      //  .checkUrlIsReachable(this.projectUniqueName, event.target.value)
      //  .pipe(finalize(() => this.loadingRequest$.next(false)))
      //  .subscribe((isReachable: boolean) => {
      //    if (isReachable) {
      //      this.urlSee = this.formatUrl(event.target.value);
      //      this.baseUrlPathTrust =
      //        this.sanitizer.bypassSecurityTrustResourceUrl(event.target.value);
      //      this.inputUrl?.nativeElement.blur();
      //    } else {
      //      this.notificationService.warn(
      //        `l\' url ${event.target.value} n'existe pas`
      //      );
      //      this.inputUrl?.nativeElement.blur();
      //    }
      //  });
    }
  }

  handleLoad($event: any) {
    const location = this.iframeElement?.nativeElement.contentWindow?.location;
    console.log(location);
    if (location !== undefined) {
      console.log(this.iframeElement?.nativeElement.contentWindow);
      this.iframeElement?.nativeElement.contentWindow?.postMessage(
        'Request DOM manipulation',
        'http://localhost:8000'
      );

      window.addEventListener('message', (event) => {
        if (event.origin !== 'http://localhost:8000') return;
        console.log('data');
        const urlFormat = this.formatUrl(event.data);
        const urlSeeFormat = this.formatUrl(this.urlSee);
        if (urlSeeFormat !== urlFormat) {
          console.log(urlFormat);
          this.urlSee = urlFormat;
          this.cd.markForCheck();
        }
      });
      /*this.iframeElement?.nativeElement.contentWindow?.addEventListener(
        'message',
        (event) => {
          console.log(event.origin)
          // Reject all messages except ones from https://video.example.com
          if (event.origin !== 'http://localhost:8000') return;

          // Filter success messages
          console.log(event.data)
          if (event.data === 'succeeded') {
            console.log('dans le succeed');
            console.log(event.data);
            // DOM manipulation is succeeded
          }
        }
      );*/
    }
  }

  private formatUrl(url: string | undefined): string | undefined {
    let urlReformat = url;
    if (url?.endsWith('/')) {
      urlReformat = url.substring(0, url.length - 1);
    }
    return urlReformat?.replace('http://', '').replace('https://', '');
  }
}
