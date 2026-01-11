import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PaintingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'paintings',
    where: {
      id: { equals: id },
    },
    depth: 2,
  })

  const painting = result.docs[0] as any

  if (!painting) return notFound()

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <nav className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="text-gray-500 hover:text-black transition-colors">
          ← На главную
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {painting.url && (
              <img
                src={painting.url}
                alt={painting.title}
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            )}
            {painting.gallery && painting.gallery.length > 0 && (
              <div className="mt-20 border-t pt-10">
                <h2 className="text-2xl font-bold mb-8">Детали и освещение</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {painting.gallery.map((item: any, index: number) => {
                    // Защита от пустых полей, если картинку удалили
                    if (!item.image || typeof item.image === 'string') return null

                    return (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden bg-gray-50 border shadow-sm"
                      >
                        <img
                          src={item.image.url}
                          alt={item.image.alt || `Деталь ${index + 1}`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 sticky top-10">
            <div>
              <h1 className="text-4xl font-bold mb-2">{painting.title}</h1>
              <p className="text-xl text-gray-500">
                {painting.medium} {painting.dimensions && `— ${painting.dimensions}`}
              </p>
            </div>

            {painting.price && (
              <div className="text-3xl font-medium text-gray-900">${painting.price}</div>
            )}

            {painting.description && (
              <div className="prose text-gray-600 leading-relaxed">{painting.description}</div>
            )}
            {painting.buyLink && (
              <a
                href={painting.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white text-center py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Купить на Saatchi Art
              </a>
            )}

            {!painting.buyLink && (
              <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                Эта работа сейчас недоступна для онлайн-покупки. Свяжитесь с автором.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
