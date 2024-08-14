import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemaTypes/blockContentType';
import category from './schemaTypes/categoryType';
import post from './schemaTypes/postType';
import author from './schemaTypes/authorType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent],
};
