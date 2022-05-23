import { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { CodeMirrorView } from 'prosemirror-codemirror-6';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python';
import { xml } from '@codemirror/lang-xml';

const nodeViews = {
  codemirror: (node: ProsemirrorNode, view: EditorView, getPos: () => number) =>
    new CodeMirrorView({
      node,
      view,
      getPos,
      cmOptions: {
        extensions: [
          basicSetup,
          javascript(),
          css(),
          html(),
          java(),
          json(),
          python(),
          xml()
        ]
      }
    })
};

export default nodeViews;
