"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        ym?: (...args: any[]) => void;
    }
}

const YM_COUNTER = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

const useYandexMetrikaHits = (metrikaId: number) => {
    const pathname = usePathname();

    useEffect(() => {
        if (!metrikaId) return;
        if (typeof window === "undefined") return;
        if (!window.ym) return;

        window.ym(metrikaId, "hit", pathname);
    }, [pathname, metrikaId]);
};

export default function Providers({ children }: { children: React.ReactNode }) {
    useYandexMetrikaHits(YM_COUNTER);
    return <>{children}</>;
}
