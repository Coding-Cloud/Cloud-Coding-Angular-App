import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { Project } from '../../../../shared/models/project.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import nodeViews from './nodeviews';
import schema from './schema';
import { CustomMenuComponent } from '../custom-menu/custom-menu.component';

@Component({
  selector: 'cc-project-comment-editor',
  templateUrl: './project-comment-editor.component.html',
  styleUrls: ['./project-comment-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCommentEditorComponent implements OnInit, OnDestroy {
  @Input()
  project: Project | null = null;

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
