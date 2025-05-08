// MainPage

import { contactPhoneFormat, contactEmail, socialVK, socialIG, socialTG, socialYT } from "./links";

export const metadataMainPageTitle = 'Новая Драма. Иркутск';
export const metadataMainPageDescription = 'Театр «Новая Драма» в Иркутске – содружество молодых актёров, которые ищут новые формы театрального искусства.';

export const metadataMainPageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "PerformingArtsTheater",
            "name": metadataMainPageTitle,
            "url": `${process.env.BASE_URL}/`,
            "logo": `${process.env.BASE_URL}/static/logo.png`,
            "image": `${process.env.BASE_URL}/static/theater.png`,
            "description": metadataMainPageDescription,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Кожова, 38",
                "addressLocality": "Иркутск",
                "postalCode": "664022",
                "addressCountry": "RU"
            },
            "telephone": contactPhoneFormat,
            "sameAs": [
                socialVK,
                socialIG,
                socialTG,
                socialYT
            ],
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${process.env.BASE_URL}/`
            } 
        },
        {
            "@type": "Organization",
            "name": metadataMainPageTitle,
            "email": contactEmail,
            "foundingDate": "2016",
            "founder": {
                "@type": "Person",
                "name": "Вадим Карионов"
            },
            "url": `${process.env.BASE_URL}/`
        }
    ]
};