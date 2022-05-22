import { ChangeDetectionStrategy, Component } from '@angular/core';
import { socialNavigation, socialUsersLink } from '../social-routing.module';

@Component({
  selector: 'cc-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialHomeComponent {
  readonly socialNavigation = socialNavigation;
  readonly socialUsersLink = socialUsersLink;
}
