import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

interface Painting {
  id: string
  title: string
  price?: number
  url?: string
  alt?: string
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const { docs: paintings } = await payload.find({
    collection: 'paintings',
    sort: '-createdAt',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="border-b py-6 mb-10 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight uppercase">Shambala Gallery</h1>
          <Link href="/about" className="text-sm font-medium hover:text-gray-600">
            Обо мне & Контакты
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {paintings.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-500">Галерея пока пуста.</h2>
            <p className="mt-2 text-gray-400">Загрузите первую работу через админку.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {paintings.map((art: any) => (
              <Link
                key={art.id}
                href={`/painting/${art.id}`}
                className="group cursor-pointer block"
              >
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-100 relative mb-4">
                    {art.url ? (
                      <Image
                        width={500}
                        height={500}
                        src={art.url}
                        alt={art.title}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">
                        Нет фото
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{art.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Холст, масло</p>
                    </div>
                    {art.price && <p className="text-lg font-medium text-gray-900">${art.price}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="py-10 text-center text-gray-400 text-sm border-t">
        © {new Date().getFullYear()} Shambala Gallery
      </footer>
    </div>
  )
}
