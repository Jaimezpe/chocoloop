"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Props = {
  src?: string;
};

export default function ChocoloopPlayer({
  src = "https://chocoloop-live.jaimezpepruebas.workers.dev/live.m3u8",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string>("Cargando señal...");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Limpieza por si se re-renderiza
    let hls: Hls | null = null;

    // Safari/iOS a veces soporta HLS nativo
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      setStatus("Señal lista (HLS nativo)");
      const onCanPlay = () => {
        setIsReady(true);
        setStatus("");
        // Autoplay suele requerir muted
        video.play().catch(() => {});
      };
      video.addEventListener("canplay", onCanPlay);
      return () => {
        video.removeEventListener("canplay", onCanPlay);
      };
    }

    // Hls.js para Chrome/Edge/Firefox
    if (Hls.isSupported()) {
      hls = new Hls({
        // Ajustes para “live” y redes cutres
        liveSyncDurationCount: 3,
        maxLiveSyncPlaybackRate: 1.5,
        lowLatencyMode: false,
        enableWorker: true,
      });

      hls.attachMedia(video);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls?.loadSource(src);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsReady(true);
        setStatus("");
        // Autoplay suele requerir muted
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_evt, data) => {
        // Mensajes útiles
        if (data?.fatal) {
          setStatus(`Error fatal: ${data.type}`);
          try {
            hls?.destroy();
          } catch {}
        } else {
          setStatus(`Cargando... (${data.type})`);
        }
      });

      return () => {
        try {
          hls?.destroy();
        } catch {}
      };
    }

    // Si no soporta nada:
    setStatus("Tu navegador no soporta HLS.");
  }, [src]);

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
        <video
          ref={videoRef}
          controls
          playsInline
          muted
          autoPlay
          style={{ width: "100%", background: "black", display: "block" }}
        />
        {!isReady && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              background: "rgba(0,0,0,0.55)",
              padding: 16,
              textAlign: "center",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {status}
          </div>
        )}
      </div>

      <p style={{ marginTop: 10, opacity: 0.7, fontFamily: "system-ui, sans-serif" }}>
        Si no arranca, prueba a recargar. Esto es un directo 24/7 extremadamente serio.
      </p>
    </div>
  );
}
