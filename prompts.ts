// src/lib/prompts.ts
// Builds prompts for the Anthropic API. Kept separate so they're easy to iterate on.

import { Ambience, BrightnessLevel, RoomDimensions } from './types'

const JSON_SCHEMA = `{
  "projectTitle": "short descriptive project name",
  "roomDescription": "one sentence describing the room",
  "architecturalNotes": "observations about ceiling type, natural light, proportions, and architectural character",
  "lightPlacements": [
    { "x": 25, "y": 20, "type": "downlight", "label": "Zone A — Primary wash", "zone": "A", "radius": 16 }
  ],
  "zones": [
    { "id": "A", "name": "Primary Ambient", "description": "General illumination across the main zone", "fixtures": 3 }
  ],
  "recommendations": {
    "lightCount": 6,
    "colorTemp": "3000K",
    "cri": "90+",
    "primaryType": "Recessed downlights",
    "dimmerRecommended": true,
    "beamAngle": "38°",
    "spacingGuide": "900mm from walls, 1200mm centres",
    "ambienceNote": "Layer primary lighting with dimmable pendants for evening intimacy"
  },
  "fixtureTypes": [
    { "type": "Recessed downlight", "count": 4, "placement": "Ceiling grid", "note": "IP44 rated near window zone" },
    { "type": "LED strip", "count": 1, "placement": "Cove/soffit", "note": "Indirect ambient wash, 2700K" }
  ],
  "tips": ["Specific actionable tip 1", "Specific actionable tip 2", "Specific actionable tip 3", "Specific actionable tip 4"],
  "avoidList": ["Common mistake to avoid 1", "Common mistake to avoid 2", "Common mistake to avoid 3"],
  "upgradeNote": "One premium suggestion that would significantly elevate the space"
}`

const SYSTEM_CONTEXT = `You are an elite architectural lighting designer with 20+ years of experience working on high-end residential and commercial projects. You combine technical precision with a deep understanding of how light shapes emotion, space, and daily life. Your recommendations are always practical, specific, and buildable — not vague or generic.`

export function buildPhotoPrompt(
  ambience: Ambience,
  brightness: BrightnessLevel,
  roomType: string,
  notes: string
): string {
  return `${SYSTEM_CONTEXT}

Analyse this room photo and deliver a complete, professional architectural lighting plan.

PARAMETERS:
- Ambience: ${ambience.name} — ${ambience.desc} (${ambience.temp})
- Brightness intent: ${brightness}
- Room type: ${roomType}
${notes ? `- Additional notes: ${notes}` : ''}

INSTRUCTIONS:
- Carefully study the ceiling type, room proportions, natural light sources, and existing architectural features.
- Place light positions (x/y as percentage of image width/height from top-left corner) where they would realistically be installed — accounting for the room's actual layout.
- Group lights into logical zones (A, B, C...) based on function: ambient, task, accent, etc.
- Be specific. No generic advice. Every recommendation should be actionable and buildable.
- Use a maximum of 8 light placements. Quality over quantity.

Respond ONLY with valid JSON matching this exact schema. No markdown, no backticks, no preamble:
${JSON_SCHEMA}`
}

export function buildManualPrompt(
  ambience: Ambience,
  brightness: BrightnessLevel,
  roomType: string,
  dims: RoomDimensions
): string {
  return `${SYSTEM_CONTEXT}

Create a complete, professional architectural lighting plan for this room.

ROOM SPECIFICATIONS:
- Type: ${roomType}
- Dimensions: ${dims.width}m wide × ${dims.length}m long × ${dims.height || '2.7'}m ceiling height
- Ambience: ${ambience.name} — ${ambience.desc} (${ambience.temp})
- Brightness intent: ${brightness}
${dims.notes ? `- Additional notes: ${dims.notes}` : ''}

INSTRUCTIONS:
- Place light positions (x/y as percentage of a top-down floor plan view) representing a realistic layout.
- Zone lights logically: ambient, task, accent, architectural.
- Calculate appropriate light count based on room area (${dims.width}m × ${dims.length}m = ${(parseFloat(dims.width || '0') * parseFloat(dims.length || '0')).toFixed(1)}m²).
- Be specific with spacing, placement from walls, and fixture type recommendations.
- Maximum 8 light placements.

Respond ONLY with valid JSON matching this exact schema. No markdown, no backticks, no preamble:
${JSON_SCHEMA}`
}
