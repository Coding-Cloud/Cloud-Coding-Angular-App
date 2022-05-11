import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontViewComponent implements OnInit {
  @Input() url: string | undefined;
  baseUrlPathTrust: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.url !== undefined) {
      this.baseUrlPathTrust = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.url
      );
      console.log(this.url);
    }
  }
}
