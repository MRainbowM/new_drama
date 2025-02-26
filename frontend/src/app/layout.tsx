import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import '../styles/globals.scss'
import { sans_narrow, montserrat, sans_caption } from './fonts'
import clsx from "clsx"
import { getMenuItems } from '../services/getMenuItems';
import RunningLine from '../components/RunningLine/RunningLine'
import Noise from '../libs/Noise/Noise'
import Script from 'next/script';
import YandexMetrika from '../components/YandexMetrika/YandexMetrika'
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const { menuItems } = await getMenuItems();

    return (
        <html lang="en">
            <body
                className={clsx(
                    sans_narrow.className,
                    `${montserrat.variable} font-sans`,
                    `${sans_narrow.variable} font-sans`,
                    `${sans_caption.variable} font-sans`,
                )}

                style={{ marginTop: -21 }}
            >

                {
                    process.env.YM_COUNTER ? (
                        <>
                            <Script id="metrika-counter" strategy="afterInteractive">
                                {
                                    `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                                m[i].l=1*new Date();
                                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                            
                                ym(${process.env.YM_COUNTER}, "init", {
                                    defer: true,
                                    clickmap:true,
                                    trackLinks:true,
                                    accurateTrackBounce:true,
                                    webvisor:true
                                }
                            );`
                                }
                            </Script>

                            <Suspense fallback={<></>}>
                                <YandexMetrika />
                            </Suspense>
                        </>
                    ) : (<></>)
                }

                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={15}
                />
                <RunningLine />
                <Header menuItems={menuItems} />
                <Container>
                    {children}
                    <Footer menuItems={menuItems} />
                </Container>
            </body>
        </html>
    )
}