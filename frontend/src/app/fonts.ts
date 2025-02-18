import { PT_Sans_Narrow, Montserrat, PT_Sans_Caption } from 'next/font/google'

export const sans_narrow = PT_Sans_Narrow({
    weight: ['400', '700'],
    subsets: ['latin', 'cyrillic'],

    variable: '--font-sans-narrow'
})

export const montserrat = Montserrat({
    weight: ['500'],
    subsets: ['latin', 'cyrillic'],

    variable: '--font-montserrat'
})

export const sans_caption = PT_Sans_Caption({
    weight: ['400'],
    subsets: ['latin', 'cyrillic'],

    variable: '--font-sans-caption'
})
