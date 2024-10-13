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
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'subtitle',
      description: '110-120 characters',
      type: 'text',
      validation: (rule) =>
        rule
          .min(110)
          .error('Subtitle should be at least 110 characters')
          .max(120)
          .warning('Short description should be less than 120 characters'),
    }),
    defineField({
      name: 'excerpt',
      description: '110-165 characters',
      type: 'text',
      validation: (rule) =>
        rule
          .min(110)
          .error('Excerpt should be at least 110 characters')
          .max(165)
          .warning('Excerpt should be less than 165 characters'),
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
      options: { hotspot: true, metadata: ['lqip'] },
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
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'tag' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Published date is required'),
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
