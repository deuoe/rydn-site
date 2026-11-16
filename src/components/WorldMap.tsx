import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps"
import { feature } from "topojson-client"
import type { FeatureCollection } from "geojson"
import type { GeometryCollection, Topology } from "topojson-specification"
import { motion } from "motion/react"
import { Globe2 } from "lucide-react"
import topoUrl from "../assets/world/countries-110m.json?url"

/**
 * Interactive 2D world map for the gateway hero.
 *
 * The TopoJSON is bundled with the site (src/assets/world/countries-110m.json,
 * emitted as a local asset by Vite), fetched same-origin at runtime, so the
 * map never depends on a CDN. Fixed view, no pan or zoom, so it can never
 * hijack page scroll.
 *
 * The gateway background is always dark (bg-slate-950), so the fills are
 * fixed dark-suitable colours rather than theme-aware ones: a theme-aware
 * fill would be wrong here, since the page stays dark in both themes.
 */

type MapStatus = "loading" | "ready" | "failed"

type MapMarker = {
  name: string
  coordinates: [number, number]
  color: string
  to: string
  label: string
  pulseDelay: number
}

const MARKERS: MapMarker[] = [
  {
    name: "Toronto",
    coordinates: [-79.38, 43.65],
    color: "#EF4444",
    to: "/youth",
    label: "Toronto: free mentorship in Canada",
    pulseDelay: 0,
  },
  {
    name: "Ancona",
    coordinates: [13.52, 43.62],
    color: "#10B981",
    to: "/med",
    label: "Ancona, Italy: study medicine",
    pulseDelay: 0.5,
  },
  {
    name: "Paris",
    coordinates: [2.35, 48.85],
    color: "#3B82F6",
    to: "/france",
    label: "France: youth exchanges",
    pulseDelay: 1,
  },
]

/** One clickable marker: pulsing ring, dot, and a hover tooltip with the label. */
function MapMarkerPin({ marker }: { marker: MapMarker }) {
  const pillWidth = marker.label.length * 6.4 + 22
  return (
    <Marker coordinates={marker.coordinates}>
      <Link
        to={marker.to}
        aria-label={marker.label}
        className="group cursor-pointer outline-none"
      >
        <title>{marker.label}</title>
        {/* Pulse ring, staggered per marker so they do not pulse in lockstep */}
        <motion.circle
          r={6}
          fill={marker.color}
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: marker.pulseDelay,
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* Dot */}
        <circle r={5.5} fill={marker.color} stroke="#ffffff" strokeWidth={1.5} />
        {/* Hover tooltip, shown on hover and keyboard focus */}
        <g className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <rect
            x={-pillWidth / 2}
            y={-38}
            width={pillWidth}
            height={24}
            rx={12}
            fill="#0f172a"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
          />
          <text
            x={0}
            y={-21.5}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill="#ffffff"
          >
            {marker.label}
          </text>
        </g>
      </Link>
    </Marker>
  )
}

export default function WorldMap() {
  const [status, setStatus] = useState<MapStatus>("loading")
  const [featureCollection, setFeatureCollection] =
    useState<FeatureCollection | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(topoUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Map data request failed: ${res.status}`)
        return res.json()
      })
      .then((data: Topology) => {
        // world-atlas countries is a GeometryCollection; convert the
        // TopoJSON to GeoJSON features for react-simple-maps.
        const fc = feature(
          data,
          data.objects.countries as GeometryCollection,
        )
        setFeatureCollection(fc)
        setStatus("ready")
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return
        setStatus("failed")
      })
    return () => controller.abort()
  }, [])

  if (status === "loading") {
    return (
      <div className="flex aspect-[800/420] w-full flex-col items-center justify-center gap-3 bg-slate-900/60 text-white/60">
        <Globe2 size={32} className="animate-pulse" />
        <p className="text-sm font-semibold">Loading map</p>
      </div>
    )
  }

  if (status === "failed" || !featureCollection) {
    return (
      <div className="flex aspect-[800/420] w-full flex-col items-center justify-center gap-2 bg-slate-900/60 px-6 text-center text-white/60">
        <Globe2 size={32} />
        <p className="text-sm font-semibold">The map could not be loaded.</p>
        <p className="text-sm">Choose your path below.</p>
      </div>
    )
  }

  return (
    <div className="aspect-[800/420] w-full bg-slate-900/60">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175, center: [-30, 32] }}
        width={800}
        height={420}
        className="h-full w-full"
        role="img"
        aria-label="World map. Markers for Toronto, Ancona, and Paris link to their RooZ paths."
      >
        <Graticule stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
        <Geographies geography={featureCollection}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-slate-600 stroke-slate-950 outline-none hover:fill-slate-500 focus:fill-slate-500"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>
        {MARKERS.map((marker) => (
          <MapMarkerPin key={marker.name} marker={marker} />
        ))}
      </ComposableMap>
    </div>
  )
}
