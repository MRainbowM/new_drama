// MainPage

import { contactPhoneFormat, contactEmail, socialVK, socialIG, socialTG, socialYT } from "./links";

export const metadataMainPageTitle = 'Новая Драма. Иркутск';
export const metadataMainPageDescription = 'Театр «Новая Драма» в Иркутске – содружество молодых актёров, которые ищут новые формы театрального искусства.';

export const metadataMainPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    "name": metadataMainPageTitle,
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