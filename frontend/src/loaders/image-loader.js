'use client'

export default function myImageLoader({ src }) {

    if (src.indexOf('/media') === 0) {
        const base = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
        return base ? `${base}${src}` : src
    }
    return src;

}