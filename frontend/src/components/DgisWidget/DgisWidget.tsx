'use client';
import { useEffect } from 'react';
import styles from './DgisWidget.module.scss';


export default function DgisWidget() {
    const iframeId = process.env.NEXT_PUBLIC_DGIS_WIDGET_ID || "dgis_widget";
    const base64html = process.env.NEXT_PUBLIC_DGIS_WIDGET_HTML || "";

    useEffect(() => {
        if (!iframeId || !base64html) {
            console.error("Ошибка: Идентификатор или HTML виджета отсутствуют!");
            return;
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = `
      ((r, u) => {
        const l = document.getElementById(r);
        if (l && l.contentWindow) {
          l.contentWindow.document.open();
          l.contentWindow.document.write(decodeURIComponent(escape(atob(u))));
          l.contentWindow.document.close();
        }
      })("${iframeId}", "${base64html}");
    `;

        document.body.appendChild(script);
    }, [iframeId, base64html]);

    return (
        <div className={styles.widgetContainer}>
            <iframe
                id={iframeId}
                className={styles.dgisIframe}
                frameBorder={0}
                sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
            ></iframe>
        </div>
    );
};
