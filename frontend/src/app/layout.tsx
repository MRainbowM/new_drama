import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import '../styles/globals.scss'
import { sans_narrow, montserrat, sans_caption } from './fonts'
import clsx from "clsx"
import { getMenuItems } from '../services/getMenuItems';
import RunningLine from '../components/RunningLine/RunningLine'

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
            >
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