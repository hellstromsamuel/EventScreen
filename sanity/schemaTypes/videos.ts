import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'videos',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFiles',
      title: 'Uploaded Videos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          preview: {
            select: {
              title: 'videoTitle',
              duration: 'duration',
            },
            prepare({title, duration}) {
              return {
                title,
                subtitle: duration ? `${duration} seconds` : 'Normal Speed',
              }
            },
          },
          fields: [
            defineField({
              name: 'videoTitle',
              title: 'Video Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'videoFile',
              title: 'Video File',
              type: 'file',
              options: {accept: 'video/*'},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Custom Duration (seconds)',
              type: 'number',
              description:
                'Set a custom duration for this video. Leave empty to play at normal speed.',
            }),
          ],
        }),
      ],
    }),
  ],
})
