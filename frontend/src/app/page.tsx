import ContactSection from '../components/ContactSection/ContactSection';
import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import SliderSection from '../components/SliderSection/SliderSection';
import TheaterSection from '../components/TheaterSection/TheaterSection';
import ViewerSection from '../components/ViewerSection/ViewerSection';
import '../styles/page.scss'

export const dynamic = 'force-dynamic';

export default async function MainPage() {
    return (<>
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