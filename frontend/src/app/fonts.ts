import localFont from 'next/font/local'

export const sans_narrow = localFont({
    src: [
        {
            path: '../fonts/PTSansNarrow-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/PTSansNarrow-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-sans-narrow',
    display: 'swap',
})

export const montserrat = localFont({
    src: [
        {
            path: '../fonts/Montserrat-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/Montserrat-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
    ],
    variable: '--font-montserrat',
    display: 'swap',
})

export const sans_caption = localFont({
    src: [
        {
            path: '../fonts/PTSansCaption-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-sans-caption',
    display: 'swap',
})
