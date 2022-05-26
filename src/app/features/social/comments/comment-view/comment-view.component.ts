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

  ngOnInit(): void {
    this.commentFormGroup.controls.commentContentView.setValue(
      JSON.parse(this.comment.content)
    );
  }

  ngOnDestroy(): void {
    this.editorView.destroy();
  }
}
