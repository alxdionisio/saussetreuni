import { useState, useRef, useEffect } from 'react'

/**
 * Vidéo chargée à la demande : le src n’est défini que lorsque l’élément
 * entre dans le viewport (Intersection Observer). Réduit le poids initial
 * et ne télécharge la vidéo qu’au défilement ou à l’ouverture de l’onglet.
 * - preload="none" : pas de chargement tant que l’utilisateur ne lit pas
 * - playsInline : lecture inline sur mobile (iOS)
 */
export default function LazyVideo({
  src,
  title,
  className,
  poster,
  children,
  ...rest
}) {
  const [videoSrc, setVideoSrc] = useState(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !src) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) setVideoSrc(src)
      },
      { rootMargin: '100px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  return (
    <div ref={wrapRef} style={{ minHeight: '200px', width: '100%' }}>
      <video
        className={className}
        src={videoSrc ?? undefined}
        controls
        preload="none"
        playsInline
        title={title}
        poster={poster}
        {...rest}
      >
        {children}
      </video>
    </div>
  )
}
