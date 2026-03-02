import EventDetail from '../../../components/EventDetail/EventDetail';
import { getEventBySlug } from '../../../services/api/getEventBySlug';
import type { Metadata } from 'next';
import { metadataMainPageTitle } from '../../../constants/metadata';

interface EventPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({
    params
  }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { data } = await getEventBySlug({ slug });
  
    if (!data) {
      return { title: metadataMainPageTitle };
    }
  
    const title = data.event.name;  
    const metaTitle = `${title} | ${metadataMainPageTitle}`;
  
    const description = data.event.short_description;
    const images = `${process.env.BASE_URL}${data.event.cover_compressed_url}`  ? data.event.cover_compressed_url : []; 
    const url = `${process.env.BASE_URL}/events/${slug}`

    return {
      title: metaTitle,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        title,
        description,
        url: url,
        images,
        siteName: metadataMainPageTitle
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images
      }
    };
  }
  

export default async function EventPage(
    { params: { slug } }: EventPageProps
) {
    const { data } = await getEventBySlug({ slug })

    if (!data) {
        return (<></>);
    }

    return (<EventDetail data={data}/>)
}