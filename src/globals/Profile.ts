import { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Профиль автора',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото автора',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Обо мне (Биография)',
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Контакты',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
  ],
}
