import { useEffect, useState } from "react";

import { getLocale } from "@/lib/corporate-i18n";
import adaVideo from "@/assets/ada.mp4.asset.json";
import adaPoster from "@/assets/ada-poster.jpg.asset.json";
import milesVideo from "@/assets/miles.mp4.asset.json";
import milesPoster from "@/assets/miles-poster.jpg.asset.json";
import aizaVideo from "@/assets/aiza.mp4.asset.json";
import aizaPoster from "@/assets/aiza-poster.jpg.asset.json";
import kaiVideo from "@/assets/kai.mp4.asset.json";
import kaiPoster from "@/assets/kai-poster.jpg.asset.json";
import adaVideoDe from "@/assets/ada-de.mp4.asset.json";
import adaPosterDe from "@/assets/ada-de.jpg.asset.json";
import milesVideoDe from "@/assets/miles-de.mp4.asset.json";
import milesPosterDe from "@/assets/miles-de.jpg.asset.json";
import aizaVideoDe from "@/assets/aiza-de.mp4.asset.json";
import aizaPosterDe from "@/assets/aiza-de.jpg.asset.json";
import kaiVideoDe from "@/assets/kai-de.mp4.asset.json";
import kaiPosterDe from "@/assets/kai-de.jpg.asset.json";

const media = {
  Ada: {
    video: adaVideo.url,
    poster: adaPoster.url,
    videoDe: adaVideoDe.url,
    posterDe: adaPosterDe.url,
    en: "Welcome to iTechLounge. I am Ada, your expert on AI and innovation.",
    de: "Willkommen bei iTechLounge. Ich bin Ada, Ihre Expertin für KI und Innovation.",
  },
  Miles: {
    video: milesVideo.url,
    poster: milesPoster.url,
    videoDe: milesVideoDe.url,
    posterDe: milesPosterDe.url,
    en: "Welcome to iTechLounge. I am Miles, your expert on cloud and connected systems.",
    de: "Willkommen bei iTechLounge. Ich bin Miles, Ihr Experte für Cloud und vernetzte Systeme.",
  },
  Aiza: {
    video: aizaVideo.url,
    poster: aizaPoster.url,
    videoDe: aizaVideoDe.url,
    posterDe: aizaPosterDe.url,
    en: "Welcome to iTechLounge. I am Aiza, your expert on Apps and user experience.",
    de: "Willkommen bei iTechLounge. Ich bin Aiza, Ihre Expertin für Apps und Nutzererlebnis.",
  },
  Kai: {
    video: kaiVideo.url,
    poster: kaiPoster.url,
    videoDe: kaiVideoDe.url,
    posterDe: kaiPosterDe.url,
    en: "Welcome to iTechLounge. I am Kai, your expert on Software and automation.",
    de: "Willkommen bei iTechLounge. Ich bin Kai, Ihr Experte für Software und Automatisierung.",
  },
};

export function PresenterVideo({ name }: { name: string }) {
  const [locale, setLocale] = useState<"en" | "de" | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setLocale(getLocale());
  }, []);
  const item = media[name as keyof typeof media];
  if (!item) return null;
  if (!locale)
    return (
      <figure className="itl-presenter" aria-busy="true">
        <div style={{ aspectRatio: "16 / 9" }} />
      </figure>
    );
  const german = locale === "de";
  const video = german ? item.videoDe : item.video;
  const poster = german ? item.posterDe : item.poster;
  return (
    <figure className="itl-presenter" translate="no" lang={locale}>
      <video
        key={video}
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={german ? `${name} – Vorstellung bei iTechLounge` : `${name} — iTechLounge introduction`}
        onError={() => setFailed(true)}
        onPlay={(event) => {
          document.querySelectorAll<HTMLVideoElement>(".itl-presenter video").forEach((v) => {
            if (v !== event.currentTarget) v.pause();
          });
        }}
      >
        <source src={video} type="video/mp4" onError={() => setFailed(true)} />
        {german ? "Ihr Browser unterstützt keine Videos." : "Your browser does not support video."}
      </video>
      <figcaption>
        <span>
          <strong>{name}</strong>
          <small>{german ? "Virtueller Begleiter · Deutscher Ton" : "Virtual guide · English audio"}</small>
        </span>
        <details>
          <summary>{german ? "Vorstellung" : "Introduction"}</summary>
          <p>{item[locale]}</p>
        </details>
      </figcaption>
      {failed && (
        <p className="itl-video-error">
          {german ? "Video derzeit nicht verfügbar. " : "Video unavailable. "}
          <a href={video}>{german ? "Video öffnen" : "Open video"}</a>
        </p>
      )}
    </figure>
  );
}
