import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import SliderSection from '../components/SliderSection/SliderSection';
import TheaterSection from '../components/TheaterSection/TheaterSection';
import { ReviewSection } from '../components/ReviewSection/ReviewSection';
import { metadataMainPageDescription, metadataMainPageJsonLd, metadataMainPageTitle } from '../constants/metadata';
import '../styles/page.scss'
import ContactsSection from '../components/ContactsSection/ContactsSection';
import Popup from '../components/Popup/Popup';
import WidgetSection from '../components/WidgetSection/WidgetSection';

export const dynamic = 'force-dynamic';


export async function generateMetadata() {
    return {
        title: metadataMainPageTitle,
        description: metadataMainPageDescription,
        openGraph: {
            title: metadataMainPageTitle,
            description: metadataMainPageDescription,
            url: `${process.env.BASE_URL}/`,
            type: 'website',
            images: [
                {
                    url: `${process.env.BASE_URL}/static/theater.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Театр «Новая Драма»'
                }
            ]
        },
        other: {
            ['yandex-verification']: `${process.env.YANDEX_VERIFICATION}`
        },
    }
}

export default function MainPage() {
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                    metadataMainPageJsonLd
                )
            }}
        />
        <Hero />
        <ScheduleSection />
        <EventPreviewSection />
        <SliderSection />
        <ReviewSection />
        <PartnerSection />
        <TheaterSection />
        <ContactsSection />
        <WidgetSection />
        <Popup />
    </>);
}