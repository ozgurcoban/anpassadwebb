import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'Short description of the post',
      type: 'text',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Short description should be less than 160 characters'),
    }),
    defineField({
      name: 'excerpt',
      description: 'Short teaser of the post',
      type: 'text',
      validation: (rule) =>
        rule.max(230).warning('Excerpt should be less than 230 characters'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required().error('Slug is required'),
      hidden: ({ document }) => !document?.title,
    }),
    // defineField({
    //   name: 'author',
    //   type: 'reference',
    //   to: { type: 'author' },
    // }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),

    defineField({
      name: 'featured',
      description: 'Show this post on the front page',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      // author: 'author.name',
      media: 'mainImage',
    },
    // prepare(selection) {
    //   const { author } = selection;
    //   return { ...selection, subtitle: author && `by ${author}` };
    // },
  },
});

export default postType;
