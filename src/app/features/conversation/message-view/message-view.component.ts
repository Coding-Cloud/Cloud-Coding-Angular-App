import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Message } from '../../../shared/models/message.model';
import { userViewLink } from '../../social/users/users-routing.module';
import { Editor, toDoc } from 'ngx-editor';
import schema from '../../social/comments/schema';
import nodeViews from '../../social/comments/nodeviews';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { MatDialog } from '@angular/material/dialog';
import { selectUser } from '../../../core/auth/auth.selectors';
import {
  actionConversationsRemoveMessage,
  actionConversationsUpdateMessage
} from '../store/conversation.actions';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cc-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageViewComponent implements OnInit, OnDestroy {
  @Input() displayUserLink = false;

  @Input() message: Message = {
    content: '',
    createdAt: new Date(),
    id: '',
    conversationId: '',
    assetId: '',
    userId: ''
  };

  currentUserId = '';
  editMode = false;

  userViewLink = userViewLink;

  editorView: Editor = new Editor({
    schema,
    nodeViews
  });

  messageFormGroup = new FormGroup({
    messageContentView: new FormControl({
      value: {
        type: 'doc',
        content: []
      },
      disabled: true
    })
  });

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.currentUserId = user.id));
  }

  ngOnInit(): void {
    const parsedMessage = JSON.parse(this.message.content);
    this.messageFormGroup.controls.messageContentView.setValue(
      parsedMessage.json ?? toDoc(parsedMessage.html, schema)
    );
  }

  ngOnDestroy(): void {
    this.editorView.destroy();
  }

  onEditSwitch() {
    this.editMode = !this.editMode;
  }

  onUpdateSubmit(newContent: string) {
    this.messageFormGroup.controls.messageContentView.setValue(
      JSON.parse(newContent).json
    );
    this.store.dispatch(
      actionConversationsUpdateMessage({
        message: {
          id: this.message.id,
          content: newContent
        }
      })
    );
    this.editMode = false;
  }

  onDelete() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Suppression d'un message",
        message: 'Êtes vous sûr de vouloir supprimer ce message ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(
          actionConversationsRemoveMessage({ messageId: this.message.id })
        );
      }
    });
  }
}
