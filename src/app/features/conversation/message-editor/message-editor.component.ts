import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Message } from '../../../shared/models/message.model';
import { Editor, toDoc, toHTML, Toolbar, Validators } from 'ngx-editor';
import schema from '../../social/comments/schema';
import nodeViews from '../../social/comments/nodeviews';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cc-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageEditorComponent implements OnInit, OnDestroy {
  @Input()
  initialMessage?: Message;

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

  messageFormGroup = new FormGroup({
    messageContent: new FormControl(
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
    if (this.initialMessage) {
      const parsedMessage = JSON.parse(this.initialMessage.content);
      this.messageFormGroup.controls.messageContent.setValue(
        parsedMessage.json ?? toDoc(parsedMessage.html, schema)
      );
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onMessageSubmit(): void {
    if (this.messageFormGroup.valid) {
      const content = JSON.stringify({
        json: this.messageFormGroup.value.messageContent,
        html: toHTML(this.messageFormGroup.value.messageContent, schema)
      });
      this.messageFormGroup.controls.messageContent.setValue(this.initialValue);
      this.submitForm.emit({ content });
    }
  }

  onCancel(): void {
    this.messageFormGroup.controls.messageContent.setValue(this.initialValue);
    this.cancel.emit();
  }
}
