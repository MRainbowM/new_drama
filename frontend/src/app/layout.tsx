import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import '../styles/globals.scss'
import { sans_narrow, montserrat } from './fonts'
import clsx from "clsx"

export const dynamic = 'force-dynamic';

export default function RootLayout({
    children, runline
}: {
    children: React.ReactNode,
    runline: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    sans_narrow.className,
                    `${montserrat.variable} font-sans`
                )}
            >
               {runline}
                <Header />
                <Container>       
                    {children}
                    <Footer />
                </Container>
            </body>
        </html>
    )
}