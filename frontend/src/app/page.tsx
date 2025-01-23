import ContactSection from '../components/ContactSection/ContactSection';
import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import SliderSection from '../components/SliderSection/SliderSection';
import TheaterSection from '../components/TheaterSection/TheaterSection';
import '../styles/page.scss'

export const dynamic = 'force-dynamic';

export default async function MainPage() {
    return (<>
        <Hero />
        <ScheduleSection />
        <EventPreviewSection />
        <SliderSection />
        <TheaterSection />
        <ContactSection />
    </>);
}