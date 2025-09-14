"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        ym?: (...args: any[]) => void;
    }
}


const YM_COUNTER = Number(process.env.YM_COUNTER);


const useYandexMetrika = (metrikaId: number) => {
    const pathname = usePathname();

    useEffect(() => {
        if (!metrikaId) return;
        if (typeof window !== "undefined") {
            // Подключаем Яндекс Метрику, если её ещё нет
            if (!window.ym) {
                (function (m, e, t, r, i, k, a) {
                    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                    // m[i].l = 1 * new Date();
                    m[i].l = Date.now();
                    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");


                window.ym(metrikaId, "init", {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                });
            }

            // Отправляем "хит" при смене страницы
            window.ym(metrikaId, "hit", pathname);
        }
    }, [pathname, metrikaId]);
};

export default function Providers({ children }: { children: React.ReactNode }) {
    useYandexMetrika(YM_COUNTER);
    return <>{children}</>;
}
