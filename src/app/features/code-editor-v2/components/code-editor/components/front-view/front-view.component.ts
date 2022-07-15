import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckHealthPathService } from '../../../../services/check-health-path.service';
import { NotificationService } from '../../../../../../core/notifications/notification.service';
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
  @Input() isResize = true;
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
    }
  }

  handleLoad($event: any) {
    const location = this.iframeElement?.nativeElement.contentWindow?.location;
    if (location !== undefined) {
      this.iframeElement?.nativeElement.contentWindow?.postMessage(
        'Request DOM manipulation',
        `*`
      );
      /*this.iframeElement?.nativeElement.contentWindow?.addEventListener('click', () => {
        console.log('je suis un event on click');
      });*/

      window.addEventListener('message', (event) => {
        if (
          event.origin !== 'http://localhost:8000' &&
          !event.origin.includes('cloudcoding.fr')
        ) {
          return;
        }
        const urlFormat = this.formatUrl(event.data);
        const urlSeeFormat = this.formatUrl(this.urlSee);
        if (urlSeeFormat !== urlFormat) {
          this.urlSee = urlFormat;
          this.cd.markForCheck();
        }
      });
    }
  }

  private formatUrl(url: string | undefined): string | undefined {
    let urlReformat = url;

    if (typeof url === 'string') {
      if (url?.endsWith('/')) {
        urlReformat = url.substring(0, url.length - 1);
      }
      console.log(`url ${url}`);
      console.log(typeof url);
      return urlReformat?.replace('http://', '').replace('https://', '');
    }
    console.log(JSON.stringify(url));
    console.log(`url ${url}`);
    console.log('return udefined');
    console.log(typeof url);
    return undefined;
  }
}
