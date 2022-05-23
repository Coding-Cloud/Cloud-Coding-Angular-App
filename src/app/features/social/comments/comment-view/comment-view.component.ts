import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import nodeViews from '../nodeviews';
import schema from '../schema';

@Component({
  selector: 'cc-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentViewComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<{ content: string }>();

  editor: Editor = new Editor({
    schema,
    nodeViews
  });
  editorView: Editor = new Editor({
    schema,
    nodeViews
  });

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    []
  ];

  commentFormGroup = new FormGroup({
    commentContent: new FormControl({
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
    }),
    commentContentView: new FormControl({
      value: {
        type: 'doc',
        content: []
      },
      disabled: true
    })
  });

  ngOnInit(): void {
    this.editor.destroy();
    this.editorView.destroy();
    this.editor = new Editor({
      schema,
      nodeViews
    });
    this.editorView = new Editor({
      schema,
      nodeViews
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editorView.destroy();
  }

  onCommentUpdate(): void {
    const newContent = this.commentFormGroup.value.commentContent;
    this.commentFormGroup.controls.commentContentView.setValue(newContent);
  }
}
