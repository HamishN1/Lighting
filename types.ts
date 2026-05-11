// src/lib/types.ts
// Shared TypeScript types across the application

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export type AmbienceId =
  | 'warm-minimal'
  | 'luxury-modern'
  | 'coastal'
  | 'scandinavian'
  | 'dark-moody'
  | 'contemporary'

export type BrightnessLevel = 'dim' | 'medium' | 'bright'

export type InputMode = 'photo' | 'manual'

export interface RoomDimensions {
  width: string
  length: string
  height: string
  notes: string
}

export interface LightPlacement {
  x: number       // percentage from left (0–100)
  y: number       // percentage from top (0–100)
  type: string    // e.g. 'downlight', 'pendant', 'strip'
  label: string   // human-readable label
  zone: string    // e.g. 'A', 'B', 'C'
  radius: number  // visual radius in percentage of image dimension
}

export interface LightingZone {
  id: string
  name: string
  description: string
  fixtures: number
}

export interface Recommendations {
  lightCount: number
  colorTemp: string
  cri: string
  primaryType: string
  dimmerRecommended: boolean
  beamAngle: string
  spacingGuide: string
  ambienceNote: string
}

export interface FixtureType {
  type: string
  count: number
  placement: string
  note: string
}

export interface AnalysisResult {
  projectTitle: string
  roomDescription: string
  architecturalNotes: string
  lightPlacements: LightPlacement[]
  zones: LightingZone[]
  recommendations: Recommendations
  fixtureTypes: FixtureType[]
  tips: string[]
  avoidList: string[]
  upgradeNote: string
}

export interface Project {
  id: string
  name: string
  roomType: string
  ambience: AmbienceId
  brightness: BrightnessLevel
  inputMode: InputMode
  imageUrl: string | null   // object URL (browser-only, not persisted)
  imageDataUrl: string | null  // base64 data URL (persisted in localStorage)
  dimensions?: RoomDimensions
  result: AnalysisResult
  createdAt: string
}

export interface Ambience {
  id: AmbienceId
  name: string
  emoji: string
  temp: string
  desc: string
}
