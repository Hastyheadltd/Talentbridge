"use client";
import { ReactNode, useEffect, useState } from "react";
import { Lato } from "next/font/google";
import { UserProvider } from "./lib/UserContext";
import "./globals.css";
import { languageNames } from "./lib/language";
import { startPingingBackend, stopPingingBackend } from "./lib/PingWorker";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

interface GoogleTranslateWindow extends Window {
  googleTranslateElementInit?: () => void;
  google?: {
    translate: {
      TranslateElement: new (options: object, elementId: string) => void;
    };
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isTranslatePromptOpen, setTranslatePromptOpen] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");

  useEffect(() => {
    // 🌐 Google Translate
    const userLangCode = navigator.language.split("-")[0];
    const languageName = languageNames[userLangCode] || languageNames.default;

    if (userLangCode !== "en") {
      setDetectedLanguage(languageName);
      setTranslatePromptOpen(true);
    }

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();

    const typedWindow = window as GoogleTranslateWindow;
    typedWindow.googleTranslateElementInit = () => {
      if (typedWindow.google?.translate?.TranslateElement) {
        new typedWindow.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "af,am,ar,az,be,bg,bn,bs,ca,ceb,co,cs,cy,da,de,el,en,eo,es,et,eu,fa,fi,fr,fy,ga,gl,gu,ha,haw,hi,hmn,hr,ht,hu,hy,id,ig,is,it,iw,ja,jw,ka,kk,km,kn,ko,ku,ky,la,lb,lo,lt,lv,mg,mi,mk,ml,mn,mr,ms,mt,my,ne,nl,no,ny,or,pa,pl,ps,pt,ro,ru,rw,sd,si,sk,sl,sm,sn,so,sq,sr,st,su,sv,sw,ta,te,tg,th,tk,tl,tr,tt,ug,uk,ur,uz,vi,xh,yi,yo,zh,zu",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };


    startPingingBackend();
    return () => stopPingingBackend(); 
  }, []);

  const handleTranslateConfirm = () => {
    setTranslatePromptOpen(false);

    const selectElement = document.querySelector(
      "select.goog-te-combo"
    ) as HTMLSelectElement;

    if (selectElement) {
      const userLang = navigator.language.split("-")[0];
      selectElement.value = userLang;
      selectElement.dispatchEvent(new Event("change"));
    }
  };

  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <UserProvider>
          <div id="google_translate_element" style={{ display: "none" }}></div>
          {children}

          {isTranslatePromptOpen && (
            <div className="popup-overlay">
              <div className="popup">
                <p>
                  It looks like your preferred language is{" "}
                  <strong>{detectedLanguage}</strong>. Would you like to
                  translate the page?
                </p>
                <button onClick={handleTranslateConfirm}>Yes, translate</button>
                <button onClick={() => setTranslatePromptOpen(false)}>
                  No, thanks
                </button>
              </div>
            </div>
          )}
        </UserProvider>
      </body>
    </html>
  );
}
