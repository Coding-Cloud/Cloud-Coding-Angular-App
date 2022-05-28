import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import nodeViews from '../nodeviews';
import schema from '../schema';
import { Comment } from '../../../../shared/models/comment.model';

@Component({
  selector: 'cc-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentEditorComponent implements OnInit, OnDestroy {
  @Input()
  initialComment?: Comment;

  @Output() submitForm = new EventEmitter<{ content: string }>();
  @Output() cancel = new EventEmitter();

  readonly initialValue = {
    type: 'doc',
    content: []
  };

  editor: Editor = new Editor({
    schema,
    nodeViews
  });

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    []
  ];

  commentFormGroup = new FormGroup({
    commentContent: new FormControl(
      {
        value: this.initialValue,
        disabled: false
      },
      Validators.required(schema)
    )
  });

  ngOnInit(): void {
    this.editor.destroy();
    this.editor = new Editor({
      schema,
      nodeViews
    });
    if (this.initialComment) {
      this.commentFormGroup.controls.commentContent.setValue(
        JSON.parse(this.initialComment.content)
      );
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onCommentSubmit(): void {
    if (this.commentFormGroup.valid) {
      const content = JSON.stringify(
        this.commentFormGroup.value.commentContent
      );
      this.commentFormGroup.controls.commentContent.setValue(this.initialValue);
      this.submitForm.emit({ content });
    }
  }

  onCancel(): void {
    this.commentFormGroup.controls.commentContent.setValue(this.initialValue);
    this.cancel.emit();
  }
}
