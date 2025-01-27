import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import '../styles/globals.scss'
import { sans_narrow, montserrat } from './fonts'
import clsx from "clsx"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    sans_narrow.className,
                    `${montserrat.variable} font-sans`
                )}
            >
                <Container>
                    <Header />
                    {children}
                    <Footer />
                </Container>
            </body>
        </html>
    )
}