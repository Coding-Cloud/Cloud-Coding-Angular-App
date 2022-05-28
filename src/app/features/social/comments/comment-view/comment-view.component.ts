import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Editor } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import nodeViews from '../nodeviews';
import schema from '../schema';
import { Comment } from '../../../../shared/models/comment.model';
import { userViewLink } from '../../users/users-routing.module';
import { projectViewLink } from '../../../projects/projects-routing.module';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../../core/auth/auth.selectors';
import { AppState } from '../../../../core/core.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {
  actionCommentsDeleteOne,
  actionCommentsUpdateOne
} from '../store/comments.actions';

@Component({
  selector: 'cc-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentViewComponent implements OnInit, OnDestroy {
  @Input() displayUserLink = false;
  @Input() displayProjectLink = false;

  @Input() comment: Comment = {
    content: '',
    createdAt: new Date(),
    id: '',
    projectId: '',
    ownerId: ''
  };

  currentUserId = '';
  editMode = false;

  userViewLink = userViewLink;
  projectViewLink = projectViewLink;

  editorView: Editor = new Editor({
    schema,
    nodeViews
  });

  commentFormGroup = new FormGroup({
    commentContentView: new FormControl({
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
    this.commentFormGroup.controls.commentContentView.setValue(
      JSON.parse(this.comment.content)
    );
  }

  ngOnDestroy(): void {
    this.editorView.destroy();
  }

  onEditSwitch() {
    this.editMode = !this.editMode;
  }

  onUpdateSubmit(newContent: string) {
    this.commentFormGroup.controls.commentContentView.setValue(
      JSON.parse(newContent)
    );
    this.store.dispatch(
      actionCommentsUpdateOne({
        comment: {
          id: this.comment.id,
          content: newContent
        }
      })
    );
    this.editMode = false;
  }

  onDelete() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Suppression d'un commentaire",
        message: 'Êtes vous sûr de vouloir supprimer ce commentaire ?'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(actionCommentsDeleteOne({ id: this.comment.id }));
      }
    });
  }
}
