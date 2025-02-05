import ContactSection from '../components/ContactSection/ContactSection';
import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import SliderSection from '../components/SliderSection/SliderSection';
import TheaterSection from '../components/TheaterSection/TheaterSection';
import ViewerSection from '../components/ViewerSection/ViewerSection';
import { contactEmail, contactPhoneFormat, socialIG, socialTG, socialVK, socialYT } from '../constants/links';
import '../styles/page.scss'
export const dynamic = 'force-dynamic';


export async function generateMetadata() {
    // console.log(jsonLd);
    return {
        title: 'Новая Драма. Иркутск',
        description: 'Театр «Новая Драма» в Иркутске – содружество молодых актёров, которые ищут новые формы театрального искусства.',
        openGraph: {
            title: 'Новая Драма. Иркутск',
            description: 'Театр «Новая Драма» в Иркутске – содружество молодых актёров, которые ищут новые формы театрального искусства.',
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
        // other: {
        //     "application/ld+json": JSON.stringify(jsonLd)
        // }
    }
}
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    "name": "Театр «Новая Драма»",
    "url": `${process.env.BASE_URL}/`,
    "logo": `${process.env.BASE_URL}/static/logo.png`,
    "image": `${process.env.BASE_URL}/static/theater.png`,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Кожова, 38",
        "addressLocality": "Иркутск",
        "postalCode": "664022",
        "addressCountry": "RU"
    },
    "telephone": contactPhoneFormat,
    "email": contactEmail,
    "sameAs": [
        socialVK,
        socialIG,
        socialTG,
        socialYT
    ],
    "description": "Театр «Новая Драма» — содружество молодых актёров, которых объединяет любовь к современной драматургии, поиск необычных сценических форм и желание работать в разных театральных жанрах.",
    "foundingDate": "2016",
    "founders": [
        {
            "@type": "Person",
            "name": "Вадим Карионов"
        }
    ]
};

export default function MainPage() {
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Hero />
        <ScheduleSection />
        <EventPreviewSection />
        <SliderSection />
        <PartnerSection />
        <TheaterSection />
        <ViewerSection />
        <ContactSection />
    </>);
}