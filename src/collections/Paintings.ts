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
    {
      name: 'medium',
      type: 'text',
      label: 'Материалы (например: Холст, масло)',
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Размер (например: 50x70 см)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание картины',
    },
    {
      name: 'buyLink',
      type: 'text',
      label: 'Ссылка на Saatchi Art (для кнопки Купить)',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Дополнительные фото (фрагменты, свет)',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Ссылаемся на коллекцию Media
          required: true,
          label: 'Фото',
        },
      ],
    },
  ],
}
