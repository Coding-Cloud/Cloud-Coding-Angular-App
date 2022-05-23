import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Editor, toHTML, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import nodeViews from '../nodeviews';
import schema from '../schema';

@Component({
  selector: 'cc-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentEditorComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<{ content: string }>();

  editor: Editor = new Editor({
    schema,
    nodeViews
  });

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'ordered_list', 'bullet_list'],
    [{ heading: ['h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    []
  ];

  commentFormGroup = new FormGroup({
    commentContent: new FormControl(
      {
        value: {
          type: 'doc',
          content: [
            {
              type: 'code_mirror',
              content: [
                {
                  type: 'text',
                  text: 'function max(a, b) {\n  return a > b ? a : b\n}'
                }
              ]
            }
          ]
        },
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
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onCommentSubmit(): void {
    if (this.commentFormGroup.valid) {
      const content = toHTML(
        this.commentFormGroup.value.commentContent,
        schema
      );
      this.submitForm.emit({ content });
    }
  }
}
