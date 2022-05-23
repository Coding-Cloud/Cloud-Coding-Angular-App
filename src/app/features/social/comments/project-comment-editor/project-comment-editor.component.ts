import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { Project } from '../../../../shared/models/project.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cc-project-comment-editor',
  templateUrl: './project-comment-editor.component.html',
  styleUrls: ['./project-comment-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCommentEditorComponent implements OnInit, OnDestroy {
  @Input()
  project: Project | null = null;

  editor: Editor = new Editor();
  public sanitizer: DomSanitizer;

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color']
  ];

  commentFormGroup = new FormGroup({
    commentContent: new FormControl({
      value: {
        type: 'doc',
        content: []
      },
      disabled: false
    })
  });

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    this.editor.destroy();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getCommentContent(): string {
    console.log(toHTML(this.commentFormGroup.value.commentContent));
    return toHTML(this.commentFormGroup.value.commentContent);
  }
}
