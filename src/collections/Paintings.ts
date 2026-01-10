import { CollectionConfig } from 'payload'

export const Paintings: CollectionConfig = {
  slug: 'paintings',
  upload: {
    staticDir: 'paintings', // Локальная папка (нужна для конфига, но файлы улетят в S3)
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true, // Публичный доступ к картинам
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Цена ($)',
    },
  ],
}