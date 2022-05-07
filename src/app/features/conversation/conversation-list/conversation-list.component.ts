import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { navigation } from '../../../app-routing.module';
import { conversationsNavigation } from '../conversations-routing.module';

@Component({
  selector: 'cc-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListComponent implements OnInit {
  conversationsLinks = conversationsNavigation;
  rootLinks = navigation;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
