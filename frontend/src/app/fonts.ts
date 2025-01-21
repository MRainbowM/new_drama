import { PT_Sans_Narrow, Montserrat } from 'next/font/google'

export const sans_narrow = PT_Sans_Narrow({
    weight: ['400', '700'],
    subsets: ['latin', 'cyrillic'],
})

export const montserrat = Montserrat({
    weight: ['500'],
    subsets: ['latin', 'cyrillic'],
    

    variable: '--font-montserrat'
})