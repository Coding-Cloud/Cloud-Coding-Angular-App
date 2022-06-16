import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from '../../../shared/models/conversation.model';
import { Message } from '../../../shared/models/message.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import {
  selectConversation,
  selectConversationAllMessages,
  selectConversationLoading,
  selectConversationMessagesLoading
} from '../store/conversation.selectors';
import { actionConversationsRetrieveAllMessages } from '../store/conversation.actions';
import { selectUser } from '../../../core/auth/auth.selectors';

@Component({
  selector: 'cc-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent {
  conversation$: Observable<Conversation>;
  messageList$: Observable<Message[]>;
  conversationLoading$: Observable<boolean>;
  messageListLoading$: Observable<boolean>;

  currentUserId = '';

  constructor(private store: Store<AppState>) {
    this.conversation$ = this.store.pipe(select(selectConversation));
    this.messageList$ = this.store.pipe(select(selectConversationAllMessages));
    this.conversationLoading$ = this.store.pipe(
      select(selectConversationLoading)
    );
    this.messageListLoading$ = this.store.pipe(
      select(selectConversationMessagesLoading)
    );

    this.conversation$.subscribe((conversation) => {
      if (conversation.id !== '0') {
        this.store.dispatch(
          actionConversationsRetrieveAllMessages({
            conversationId: conversation.id
          })
        );
      }
    });
    this.store.pipe(select(selectUser)).subscribe((user) => {
      this.currentUserId = user.id;
    });
  }

  conversationLoaded(
    conversationLoading: boolean,
    messageListLoading: boolean
  ): boolean {
    return !conversationLoading && !messageListLoading;
  }

  isMessageFromCurrentUser(message: Message): boolean {
    return message.userId === this.currentUserId;
  }

  determineMessageClass(message: Message): string {
    if (this.isMessageFromCurrentUser(message)) {
      return 'col-8 align-self-end';
    }
    return 'col-8';
  }
}
