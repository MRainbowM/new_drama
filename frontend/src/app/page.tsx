import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import SliderSection from '../components/SliderSection/SliderSection';
import '../styles/page.scss'

export default async function MainPage() {
    return (<>
        <Hero />
        <ScheduleSection />
        <EventPreviewSection />
        <SliderSection />
    </>);
}