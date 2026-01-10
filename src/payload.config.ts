import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp' // create-payload-app ставит его сам
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Paintings } from './collections/Paintings'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug, // Это ссылается на коллекцию Users
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Обязательно регистрируем коллекции
  collections: [Users, Media, Paintings],
  plugins: [
    s3Storage({
      collections: {
        // Приводим к any, чтобы TS не ругался, как мы выяснили
        ['paintings' as any]: true,
        ['media' as any]: true,
      },
      bucket: process.env.S3_BUCKET || 'paintings',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        region: 'eu-west-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
