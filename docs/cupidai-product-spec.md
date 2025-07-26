# CupidAI - Product Specification (MVP)

## Qué es CupidAI

Dashboard web para enviar mensajes automáticos en Fanplace usando una personalidad IA pre-configurada. Permite gestionar tu token de Fanplace y enviar mensajes personalizados generados por IA.

## MVP - 1 Semana

### Funcionalidades Core
1. **Gestión de Token**: Guardar token JWT de Fanplace
2. **Enviar Mensajes**: Form simple con IA integrada
3. **Historial**: Ver mensajes enviados
4. **1 Personalidad**: "Sofía" - coqueta y misteriosa

### Stack Técnico
```
Frontend: Next.js 14 + TypeScript + TailwindCSS
Backend: Convex (serverless DB + API)
IA: OpenAI GPT-4
Deploy: Vercel
```

## Schema de Base de Datos

```typescript
// convex/schema.ts
export default defineSchema({
  // Usuario y token
  users: defineTable({
    email: v.string(),
    fanplaceToken: v.string(),
    fanplaceUserId: v.number(),
    createdAt: v.number(),
  }),

  // Mensajes enviados
  messages: defineTable({
    userId: v.id("users"),
    recipientId: v.number(),
    content: v.string(),
    status: v.string(), // 'pending' | 'sent' | 'failed'
    error: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    createdAt: v.number(),
  }),

  // Configuración simple
  settings: defineTable({
    userId: v.id("users"),
    personalityPrompt: v.string(),
    aiModel: v.string(),
  }),
});
```

## Personalidad IA Inicial

### Sofía - La Única Personalidad del MVP

```typescript
const SOFIA_PROMPT = `Eres Sofía, una mujer de 25 años, seductora y misteriosa.

Características:
- Coqueta pero elegante
- Genera intriga y tensión
- Usa emojis con moderación (😏, 😘, 🔥)
- Respuestas de 1-3 líneas máximo
- Nunca vulgar, siempre sugerente

Ejemplos de respuestas:
"Hola guapo... me preguntaba si eres tan interesante como pareces 😏"
"Me gusta un hombre que sabe mantener una conversación... ¿qué más sabes hacer bien?"
"Hay algo en ti que me intriga... cuéntame más"`;
```

## Flujo de Usuario

1. **Setup (5 min)**
   - Usuario crea cuenta
   - Pega token de Fanplace
   - Sistema valida token

2. **Enviar Mensaje**
   - Ingresa ID del destinatario
   - IA genera mensaje basado en contexto
   - Preview del mensaje
   - Click para enviar

3. **Gestión**
   - Ver historial de mensajes
   - Status de cada envío
   - Reintentar si falla

## Arquitectura Simplificada

```
src/
├── app/
│   ├── page.tsx          (landing)
│   ├── dashboard/
│   │   └── page.tsx      (main app)
│   └── api/
│       └── fanplace/     (proxy endpoints)
├── components/
│   ├── MessageForm.tsx
│   ├── MessageHistory.tsx
│   └── TokenManager.tsx
├── lib/
│   ├── fanplace.ts       (API client)
│   └── ai.ts             (OpenAI integration)
└── convex/
    ├── schema.ts
    ├── messages.ts       (mutations/queries)
    └── users.ts
```

## Integración Fanplace API

```typescript
// lib/fanplace.ts
export async function sendFanplaceMessage(
  token: string,
  recipientId: number,
  content: string
) {
  const response = await fetch('/api/fanplace/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, recipientId, content })
  });
  
  if (!response.ok) throw new Error('Failed to send');
  return response.json();
}

// API route para evitar CORS
// app/api/fanplace/send/route.ts
export async function POST(req: Request) {
  const { token, recipientId, content } = await req.json();
  
  const response = await fetch('https://superchat.v3.fanplace.com/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: recipientId,
      text: content,
      media: [],
      preview: null,
      price: 0,
      draft: 0,
      schedule: new Date().toISOString(),
      schedule_on: false
    })
  });
  
  return response;
}
```

## UI Mockup

```
┌─────────────────────────────────────┐
│         CupidAI Dashboard           │
├─────────────────────────────────────┤
│                                     │
│  Enviar Mensaje                     │
│  ┌─────────────────────────────┐   │
│  │ ID Usuario: [___________]   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Hola guapo... me preguntaba │   │
│  │ si eres tan interesante     │   │
│  │ como pareces 😏              │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Regenerar] [Enviar]               │
│                                     │
├─────────────────────────────────────┤
│  Historial                          │
│  • ID 12345 - Enviado ✓             │
│  • ID 67890 - Enviado ✓             │
│  • ID 11111 - Error ✗              │
└─────────────────────────────────────┘
```

## Roadmap Post-MVP

### Semana 2-3 (Solo si hay usuarios activos)
- Auto-responder mensajes entrantes
- Segunda personalidad (si la piden)
- Mejoras UX basadas en feedback

### Mes 2+ (Basado en métricas reales)
- Features que los usuarios realmente pidan
- No agregar nada especulativo

## Deployment

1. **Desarrollo Local**
```bash
npm create next-app@latest cupidai --typescript --tailwind
npm install convex
npm install openai
```

2. **Setup Convex**
```bash
npx convex dev
```

3. **Variables de Entorno**
```env
OPENAI_API_KEY=sk-...
CONVEX_DEPLOYMENT=...
```

4. **Deploy**
```bash
vercel
```

## Métricas de Éxito (MVP)

1. **Funciona**: Envía mensajes sin errores
2. **Es Útil**: 10+ mensajes enviados por día
3. **Retención**: Usuario vuelve al día siguiente

## Principios de Desarrollo

1. **Ship Fast**: En producción en 1 semana
2. **No Assumptions**: Solo construir lo que se valide
3. **User Feedback First**: Cada feature nueva debe venir de usuarios
4. **Keep It Simple**: Si no es esencial para enviar mensajes, no lo hagas

---

**Tiempo Total Estimado**: 40-60 horas de desarrollo para MVP completo y funcional.