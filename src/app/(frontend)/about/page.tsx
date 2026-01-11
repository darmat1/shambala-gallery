import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const profile = (await payload.findGlobal({
    slug: 'profile',
    depth: 1,
  })) as any

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
        <Link href="/" className="font-bold uppercase tracking-widest">
          Shambala Gallery
        </Link>
        <Link href="/" className="text-gray-500 hover:text-black">
          ← Галерея
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          {profile.photo?.url && (
            <div className="w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-gray-100 shadow-xl">
              <img src={profile.photo.url} alt="Artist" className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-6">О художнике</h1>
            <div className="prose text-lg text-gray-600 whitespace-pre-line">
              {profile.bio || 'Биография еще не заполнена.'}
            </div>
          </div>
        </div>

        <div className="border-t pt-10">
          <h2 className="text-2xl font-bold mb-6">Контакты</h2>
          <div className="grid gap-4 text-lg">
            {profile.contacts?.email && (
              <div className="flex gap-2">
                <span className="font-semibold">Email:</span>
                <a
                  href={`mailto:${profile.contacts.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.contacts.email}
                </a>
              </div>
            )}
            {profile.contacts?.instagram && (
              <div className="flex gap-2">
                <span className="font-semibold">Instagram:</span>
                <a
                  href={profile.contacts.instagram}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Instagram profile
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
