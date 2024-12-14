import EventPreviewSection from '../components/EventPreviewSection/EventPreviewSection';
import Hero from '../components/Hero/Hero';
import '../styles/page.scss'

export default async function MainPage() {


    return (<>
        <Hero />
        <EventPreviewSection />
    </>);
}