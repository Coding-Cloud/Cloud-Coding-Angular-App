import { Component, Input, OnInit } from '@angular/core';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { setBlockType } from 'prosemirror-commands';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import schema from '../schema';
import nodeViews from '../nodeviews';

@Component({
  selector: 'cc-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent implements OnInit {
  @Input() editor: Editor = new Editor({
    schema,
    nodeViews
  });
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive) {
      return setBlockType(schema.nodes.paragraph)(state, dispatch);
    }

    return setBlockType(schema.nodes.codemirror)(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes.codemirror);
    this.isDisabled = !this.execute(state, undefined); // returns true if executable
  };

  ngOnInit(): void {
    this.editor.update.subscribe((view) => this.update(view));
  }
}
