'use client'

export default function myImageLoader({ src }) {

    if (src.indexOf('/media') === 0) {
        return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
    }
    return src;

}