import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  @Input() url: string | undefined;
  urlSee: string | undefined;
  baseUrlPathTrust: SafeResourceUrl | undefined;
  urlIsFocused = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.url !== undefined) {
      this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.url
      );
      this.urlSee = this.url.replace('http://', '').replace('https://', '');
      console.log(this.url);
    }
  }

  handleFocus() {
    this.urlSee = this.url;
    this.urlIsFocused = true;
  }

  handleFocusOut() {
    this.urlSee = this.formatUrl();
    this.urlIsFocused = false;
  }

  handleChange(event: any) {
    if (event.key === 'Enter') {
      this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
        event.target.value
      );
      console.log(this.baseUrlPathTrust);
    }
  }

  private formatUrl(): string | undefined {
    return this.url?.replace('http://', '').replace('https://', '');
  }
}
