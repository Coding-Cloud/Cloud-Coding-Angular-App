import { nodes as basicNodes, marks } from 'ngx-editor';
import { Schema } from 'prosemirror-model';
import { node as codemirrorNode } from 'prosemirror-codemirror-6';

const nodes = {
  ...basicNodes,
  code_mirror: codemirrorNode
};

const schema = new Schema({
  nodes,
  marks
});

export default schema;
