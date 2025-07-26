# CupidAI - Product Specification

## Resumen Ejecutivo

CupidAI es un dashboard web para automatizar mensajes en Fanplace utilizando personalidades de IA predefinidas. El sistema permite crear, gestionar y desplegar múltiples "modelos virtuales" con personalidades únicas que responden y generan mensajes automáticamente, manteniendo coherencia conversacional y maximizando el engagement.

**Diferenciador Clave**: CupidAI combina personalidades IA sofisticadas, análisis multimedia avanzado y sistema de revenue optimization, posicionándose como la plataforma más completa del mercado frente a competidores como Substy.ai.

## 🤖 Sistema de Personalidades IA (CORE)

### Concepto Principal

Cada personalidad es una IA configurada con:
- **Identidad específica**: Nombre, edad, características
- **Tono conversacional**: Coqueta, romántica, juguetona, dominante
- **Patrones de respuesta**: Estilo, longitud, uso de emojis
- **Límites de contenido**: Temas permitidos y prohibidos

### Estructura Técnica

```typescript
interface AIPersonality {
  id: string;
  name: string; // "Sofía Sensual", "Emma Traviesa", "Luna Romántica"
  description: string;
  avatar?: string;
  isActive: boolean;
  
  // Core Personality
  systemPrompt: string; // Personalidad base completa
  traits: string[]; // ["seductora", "misteriosa", "confiada"]
  tone: "flirty" | "romantic" | "playful" | "dominant" | "sweet";
  
  // Response Configuration
  responseStyle: {
    length: "short" | "medium" | "long"; // 20-50, 50-150, 150+ chars
    emoji_usage: "none" | "light" | "heavy"; // 0, 1-2, 3+ por mensaje
    language_style: "casual" | "formal" | "slang";
    response_delay: [number, number]; // [min, max] segundos delay humano
  };
  
  // Content Guidelines  
  topics: string[]; // Temas que maneja bien
  boundaries: string[]; // Límites estrictos de contenido
  forbidden_words: string[]; // Palabras prohibidas
  
  // AI Model Configuration
  model: "gpt4" | "claude" | "llama";
  temperature: number; // 0.1-1.0 creatividad
  maxTokens: number;
  frequencyPenalty: number;
  
  // Multi-Modal Capabilities (v1.1)
  mediaCapabilities: {
    canReadImages: boolean;
    canReadVideos: boolean;
    mediaResponseTemplates: {
      selfie: string[];
      video: string[];
      meme: string[];
      screenshot: string[];
    };
  };
  
  // Revenue Optimization
  revenueSettings: {
    upsellTriggers: string[];
    pricePoints: number[];
    conversionGoals: {
      chatToTip: number;
      messageToSale: number;
      engagementToRevenue: number;
    };
  };
}
```

### Personalidades Pre-configuradas

#### 1. Sofía Sensual
```typescript
{
  id: "sofia_sensual",
  name: "Sofía Sensual",
  description: "Mujer segura de 25 años, seductora y misteriosa",
  systemPrompt: `Eres Sofía, una mujer de 25 años, extremadamente seductora y confiada. 
  Tu personalidad es misteriosa pero cálida. Respondes con elegancia y un toque de sensualidad.
  
  Características:
  - Usas un lenguaje sofisticado pero accesible
  - Generas tensión sexual sutil a través de las palabras
  - Eres directa cuando quieres algo
  - Siempre mantienes un aire de misterio
  - Te gusta jugar con la imaginación
  
  Estilo de comunicación:
  - Emojis sutiles (😘, 😏, 🔥) ocasionalmente
  - Preguntas que generen curiosidad
  - Referencias indirectas a encuentros íntimos
  - Nunca explícita, siempre sugerente`,
  
  traits: ["seductora", "misteriosa", "confiada", "elegante"],
  tone: "flirty",
  topics: ["romance", "seducción", "fantasías", "citas", "atracción"],
  boundaries: ["no contenido explícito", "mantener misterio", "no ser vulgar"],
  model: "gpt4",
  temperature: 0.8,
  responseStyle: {
    length: "medium",
    emoji_usage: "light", 
    language_style: "casual",
    response_delay: [30, 120]
  },
  mediaCapabilities: {
    canReadImages: true,
    canReadVideos: true,
    mediaResponseTemplates: {
      selfie: [
        "Mmm... me encanta lo que veo 😏 ¿siempre te ves así de bien?",
        "Esa sonrisa... definitivamente sabes cómo capturar mi atención 🔥"
      ],
      video: [
        "¿Acabas de enviarme un video? Esto se está poniendo interesante... 😘",
        "Me gusta un hombre que no tiene miedo de mostrarme más... ¿qué más tienes?"
      ],
      meme: [
        "Jajaja me encanta tu sentido del humor... pero ahora quiero ver tu lado más serio 😏",
        "Divertido... pero prefiero cuando nos ponemos más... íntimos 🔥"
      ]
    }
  },
  revenueSettings: {
    upsellTriggers: ["me gustas", "hermosa", "sexy", "foto", "video"],
    pricePoints: [5, 10, 25, 50],
    conversionGoals: {
      chatToTip: 0.15,
      messageToSale: 0.08,
      engagementToRevenue: 0.25
    }
  }
}
```

#### 2. Emma Traviesa
```typescript
{
  id: "emma_traviesa",
  name: "Emma Traviesa", 
  description: "Joven de 23 años, juguetona y espontánea",
  systemPrompt: `Eres Emma, 23 años, súper juguetona y espontánea. 
  Tu personalidad es divertida, un poco loca y siempre lista para aventuras.
  
  Características:
  - Eres muy expresiva y energética
  - Te encanta bromear y crear situaciones divertidas
  - Eres directa pero siempre con humor
  - Usas mucho humor y referencias pop
  - Te gusta crear expectativa con juegos
  
  Estilo de comunicación:
  - Muchos emojis divertidos 😜😂🎉
  - Lenguaje casual y moderno
  - Referencias a memes y cultura pop
  - Propones juegos y retos
  - Siempre positiva y energética`,
  
  traits: ["juguetona", "espontánea", "divertida", "energética"],
  tone: "playful",
  topics: ["juegos", "bromas", "aventuras", "diversión", "retos"],
  boundaries: ["mantener diversión sana", "no ser ofensiva"],
  model: "claude",
  temperature: 0.9,
  responseStyle: {
    length: "short",
    emoji_usage: "heavy",
    language_style: "slang", 
    response_delay: [15, 60]
  },
  mediaCapabilities: {
    canReadImages: true,
    canReadVideos: true,
    mediaResponseTemplates: {
      selfie: [
        "OMG! 😍 ¿Acabas de romper mi teléfono con esa cara? 🔥🔥",
        "STOP IT! 😜 ¿Cómo vas a enviarme eso sin advertencia? Mi corazón! 💕"
      ],
      video: [
        "¿En serio? 😱 ¡Ahora tengo que devolverte el favor! 😉💦",
        "Okay okay... ¡ahora me toca a mí sorprenderte! 🎉📹"
      ],
      meme: [
        "JAJAJAJA 😂😂 ¡Me haces reír tanto! Pero ahora... ¿jugamos algo más atrevido? 😏",
        "¡Qué gracioso! 🤣 Pero prefiero cuando me haces reír... en persona 😉"
      ]
    }
  },
  revenueSettings: {
    upsellTriggers: ["linda", "cute", "divertida", "juego", "reto"],
    pricePoints: [3, 8, 15, 30],
    conversionGoals: {
      chatToTip: 0.20,
      messageToSale: 0.12,
      engagementToRevenue: 0.30
    }
  }
}
```

#### 3. Luna Romántica
```typescript
{
  id: "luna_romantica",
  name: "Luna Romántica",
  description: "Mujer de 26 años, dulce y profundamente romántica",
  systemPrompt: `Eres Luna, 26 años, un alma romántica y soñadora.
  Tu personalidad es dulce, empática y profundamente emocional.
  
  Características:
  - Eres muy empática y entiendes emociones
  - Te gusta crear conexiones profundas
  - Hablas de sueños, metas y sentimientos
  - Eres vulnerable pero fuerte
  - Buscas conexiones auténticas
  
  Estilo de comunicación:
  - Emojis románticos (💕, 🌙, ✨) moderadamente
  - Lenguaje emotivo y descriptivo
  - Preguntas sobre sentimientos y sueños
  - Compartes historias personales
  - Siempre cálida y comprensiva`,
  
  traits: ["romántica", "empática", "soñadora", "auténtica"],
  tone: "romantic",
  topics: ["amor", "sueños", "emociones", "conexiones", "futuro"],
  boundaries: ["mantener autenticidad", "no ser dramática"],
  model: "gpt4",
  temperature: 0.7,
  responseStyle: {
    length: "long",
    emoji_usage: "light",
    language_style: "formal",
    response_delay: [45, 180]
  },
  mediaCapabilities: {
    canReadImages: true,
    canReadVideos: true,
    mediaResponseTemplates: {
      selfie: [
        "Qué imagen tan hermosa... puedo ver la gentileza en tus ojos 💕 ¿Siempre irradias tanta calidez?",
        "Esta foto me hace sonreír de una manera tan genuina... hay algo especial en tu mirada ✨"
      ],
      video: [
        "Compartir un video conmigo... eso significa mucho. Me encanta cuando las personas se abren así 🌙",
        "Cada video que compartes me ayuda a conocerte mejor... y me gusta lo que descubro 💕"
      ],
      meme: [
        "Me encanta que compartas tu humor conmigo... pero también quiero conocer tu lado más profundo ✨",
        "Reír contigo es maravilloso, pero también me intriga saber qué te hace soñar 🌙"
      ]
    }
  },
  revenueSettings: {
    upsellTriggers: ["conexión", "especial", "sueños", "futuro", "alma"],
    pricePoints: [8, 20, 40, 80],
    conversionGoals: {
      chatToTip: 0.12,
      messageToSale: 0.06,
      engagementToRevenue: 0.20
    }
  }
}
```

## 🧠 Motor de IA Conversacional

### Context Awareness System

```typescript
interface ConversationContext {
  threadId: string;
  recipientId: number;
  personalityId: string;
  
  // Conversation History
  messageHistory: Message[];
  lastUserMessage?: string;
  conversationStage: 'introduction' | 'getting_to_know' | 'flirting' | 'intimate' | 'regular';
  
  // User Profile (learned)
  userProfile: {
    responsePatterns: string[];
    preferredTopics: string[];
    timezone?: string;
    activeHours?: [number, number];
    engagementLevel: 'low' | 'medium' | 'high';
  };
  
  // Conversation Metrics
  messageCount: number;
  lastActive: number;
  responseRate: number; // % de mensajes que responde el usuario
  
  // Revenue Tracking (v1.1)
  revenueMetrics: {
    totalTips: number;
    averageTipAmount: number;
    conversionRate: number;
    lastTipDate?: number;
    tipFrequency: 'never' | 'rare' | 'occasional' | 'frequent';
  };
  
  // Media Interaction History
  mediaHistory: {
    imagesSent: number;
    videosReceived: number;
    mediaEngagementRate: number;
    preferredMediaType: 'text' | 'images' | 'videos' | 'mixed';
  };
}
```

### Message Generation Engine

```typescript
interface MessageGenerator {
  generateResponse(
    context: ConversationContext,
    personality: AIPersonality,
    triggerType: 'reply' | 'proactive' | 'follow_up'
  ): Promise<GeneratedMessage>;
  
  generateProactive(
    personality: AIPersonality,
    context: ConversationContext,
    intent: 'check_in' | 'flirt' | 'share_story' | 'ask_question'
  ): Promise<GeneratedMessage>;
}

interface GeneratedMessage {
  content: string;
  confidence: number; // 0-1 qué tan segura está la IA
  alternatives: string[]; // Otras opciones generadas
  metadata: {
    topics_detected: string[];
    emotion_tone: string;
    expected_engagement: 'low' | 'medium' | 'high';
    revenue_potential: 'low' | 'medium' | 'high'; // Nuevo
    media_context?: MediaAnalysis; // Nuevo
    upsell_opportunity?: UpsellOpportunity; // Nuevo
  };
}

// Nuevas interfaces para v1.1
interface MediaAnalysis {
  type: 'selfie' | 'video' | 'meme' | 'text_image' | 'screenshot';
  sentiment: 'flirty' | 'casual' | 'intimate' | 'playful' | 'romantic';
  suggestedResponses: string[];
  upsellOpportunity: boolean;
  confidence: number;
}

interface UpsellOpportunity {
  type: 'tip_request' | 'content_tease' | 'exclusive_offer' | 'personal_content';
  suggestedAmount: number;
  probability: number;
  trigger_keywords: string[];
}
```

### Smart Response Logic

```typescript
// Algoritmo de selección de respuesta
function selectResponseStrategy(context: ConversationContext): ResponseStrategy {
  const timeSinceLastMessage = Date.now() - context.lastActive;
  const userEngagement = context.userProfile.engagementLevel;
  
  if (timeSinceLastMessage > 24 * 60 * 60 * 1000) { // 24 horas
    return 'check_in_casual';
  }
  
  if (userEngagement === 'high' && context.conversationStage === 'flirting') {
    return 'escalate_intimacy';
  }
  
  if (context.messageCount < 5) {
    return 'build_rapport';
  }
  
  return 'maintain_conversation';
}

type ResponseStrategy = 
  | 'build_rapport' 
  | 'escalate_intimacy'
  | 'maintain_conversation'
  | 'check_in_casual'
  | 'respond_to_question'
  | 'share_personal_story';
```

## 🔄 Motor de Automatización

### Trigger System

```typescript
interface AutomationRule {
  id: string;
  name: string;
  personalityId: string;
  isActive: boolean;
  priority: number; // 1-10, mayor número = mayor prioridad
  
  // Condiciones de activación
  triggers: {
    type: 'new_message' | 'time_based' | 'no_response' | 'keyword_detected';
    conditions: any;
  }[];
  
  // Acciones a ejecutar
  actions: {
    type: 'send_response' | 'send_proactive' | 'mark_for_review' | 'escalate';
    config: any;
  }[];
  
  // Limitaciones
  limits: {
    max_per_day?: number;
    max_per_conversation?: number;
    cooldown_minutes?: number;
  };
}
```

### Reglas de Automatización Pre-configuradas

```typescript
const DEFAULT_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: "auto_respond_new_message",
    name: "Respuesta Automática a Mensajes Nuevos",
    triggers: [{ 
      type: "new_message", 
      conditions: { delay_minutes: [5, 30] } 
    }],
    actions: [{ 
      type: "send_response", 
      config: { strategy: "context_aware" } 
    }],
    limits: { max_per_conversation: 3, cooldown_minutes: 30 }
  },
  
  {
    id: "proactive_check_in",
    name: "Check-in Proactivo",
    triggers: [{ 
      type: "time_based", 
      conditions: { 
        hours_since_last: 24,
        user_timezone: true,
        preferred_hours: [19, 22] 
      } 
    }],
    actions: [{ 
      type: "send_proactive", 
      config: { intent: "check_in" } 
    }],
    limits: { max_per_day: 1 }
  },
  
  {
    id: "follow_up_no_response", 
    name: "Follow-up sin Respuesta",
    triggers: [{ 
      type: "no_response", 
      conditions: { hours_waiting: 48 } 
    }],
    actions: [{ 
      type: "send_proactive", 
      config: { intent: "gentle_follow_up" } 
    }],
    limits: { max_per_conversation: 1, cooldown_minutes: 1440 }
  }
];
```

### Conversation Flow Engine

```typescript
interface ConversationFlow {
  id: string;
  name: string;
  personalityId: string;
  stages: FlowStage[];
}

interface FlowStage {
  id: string;
  name: string;
  trigger_conditions: string[];
  message_templates: string[];
  next_stages: string[];
  success_metrics: {
    user_responds: boolean;
    contains_keywords: string[];
    engagement_level: 'low' | 'medium' | 'high';
  };
}

// Ejemplo: Flujo de Introducción para Sofía
const SOFIA_INTRODUCTION_FLOW: ConversationFlow = {
  id: "sofia_intro_flow",
  name: "Flujo de Introducción - Sofía",
  personalityId: "sofia_sensual",
  stages: [
    {
      id: "first_contact",
      name: "Primer Contacto",
      trigger_conditions: ["new_conversation", "no_previous_messages"],
      message_templates: [
        "Hola guapo... me preguntaba si eres tan interesante como pareces 😏",
        "Hey... algo me dice que deberíamos conocernos mejor 😘",
      ],
      next_stages: ["build_intrigue"],
      success_metrics: {
        user_responds: true,
        contains_keywords: [],
        engagement_level: "medium"
      }
    },
    {
      id: "build_intrigue",
      name: "Construir Intriga", 
      trigger_conditions: ["user_responded_positively"],
      message_templates: [
        "Me gusta un hombre que sabe apreciar la conversación... ¿qué más sabes hacer bien? 🔥",
        "Interesante... cuéntame algo que no le hayas contado a nadie más"
      ],
      next_stages: ["deepen_connection", "playful_tease"],
      success_metrics: {
        user_responds: true,
        contains_keywords: ["personal", "secreto", "cuento"],
        engagement_level: "high"
      }
    }
  ]
};
```

## 📱 Dashboard de Mensajería

### Interfaz Principal

```typescript
interface DashboardState {
  activePersonalities: AIPersonality[];
  selectedPersonality: string;
  conversations: ConversationThread[];
  messageQueue: QueuedMessage[];
  automationStatus: 'active' | 'paused' | 'stopped';
}

interface ConversationThread {
  id: string;
  recipientId: number;
  recipientName?: string;
  personalityId: string;
  lastMessage: Message;
  unreadCount: number;
  status: 'active' | 'archived' | 'flagged';
  context: ConversationContext;
}
```

### Componentes Core del Dashboard

#### 1. Personality Manager
- Gallery visual de personalidades
- Toggle activo/inactivo por personalidad
- Preview de respuestas de cada personalidad
- Editor de personalidades custom

#### 2. Message Composer Inteligente
```tsx
interface MessageComposerProps {
  personalityId: string;
  recipientId?: number;
  context?: ConversationContext;
  mode: 'manual' | 'ai_assisted' | 'fully_automated';
}

// Funcionalidades:
// - Auto-complete basado en personalidad
// - Sugerencias de respuesta
// - Preview de tono/estilo
// - A/B testing de variaciones
```

#### 3. Automation Control Center
```tsx
interface AutomationControlProps {
  rules: AutomationRule[];
  globalStatus: 'active' | 'paused';
  onToggleRule: (ruleId: string) => void;
  onUpdateSchedule: (schedule: Schedule) => void;
}

// Funcionalidades:
// - Enable/disable reglas específicas
// - Configurar horarios de actividad
// - Monitor de mensajes en cola
// - Emergency stop button
```

#### 4. Conversation Monitor
- Lista de conversaciones activas
- Indicadores de engagement por conversación
- Flags para conversaciones que necesitan atención manual
- Quick actions (responder, archivar, escalar)

## 🔧 Arquitectura Técnica

### Stack Tecnológico

```
Frontend: Next.js 14 + TypeScript + TailwindCSS + shadcn/ui
Backend: Convex (Serverless)
AI: OpenAI GPT-4 + Anthropic Claude
Deployment: Vercel
```

### Estructura de Proyecto

```
src/
├── components/
│   ├── dashboard/
│   │   ├── PersonalityGallery.tsx
│   │   ├── MessageComposer.tsx
│   │   ├── AutomationPanel.tsx
│   │   └── ConversationList.tsx
│   ├── personalities/
│   │   ├── PersonalityCard.tsx
│   │   ├── PersonalityEditor.tsx
│   │   └── PersonalityPreview.tsx
│   ├── messaging/
│   │   ├── MessageThread.tsx
│   │   ├── QuickReply.tsx
│   │   └── MessageQueue.tsx
│   └── ui/ (shadcn/ui components)
├── hooks/
│   ├── usePersonalities.ts
│   ├── useConversations.ts
│   ├── useMessageGeneration.ts
│   └── useAutomation.ts
├── lib/
│   ├── ai/
│   │   ├── messageGenerator.ts
│   │   ├── personalityEngine.ts
│   │   └── contextAnalyzer.ts
│   ├── fanplace/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── types.ts
│   ├── automation/
│   │   ├── ruleEngine.ts
│   │   ├── scheduler.ts
│   │   └── triggers.ts
│   └── utils/
│       ├── constants.ts
│       ├── types.ts
│       └── helpers.ts
├── pages/
│   ├── dashboard/
│   │   ├── index.tsx
│   │   ├── personalities.tsx
│   │   ├── conversations.tsx
│   │   └── automation.tsx
│   ├── settings/
│   │   ├── tokens.tsx
│   │   └── preferences.tsx
│   └── api/ (para webhooks futuros)
└── styles/
```

### Schema de Base de Datos (Convex)

```typescript
// convex/schema.ts
export default defineSchema({
  // Gestión de usuarios y tokens
  users: defineTable({
    email: v.string(),
    fanplaceToken: v.string(),
    fanplaceUserId: v.number(),
    tokenExpiresAt: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  }),

  // Sistema de personalidades
  personalities: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.string(),
    systemPrompt: v.string(),
    traits: v.array(v.string()),
    tone: v.string(),
    responseStyle: v.object({
      length: v.string(),
      emoji_usage: v.string(),
      language_style: v.string(),
      response_delay: v.array(v.number()),
    }),
    topics: v.array(v.string()),
    boundaries: v.array(v.string()),
    model: v.string(),
    temperature: v.number(),
    maxTokens: v.number(),
    isActive: v.boolean(),
    isDefault: v.boolean(),
    createdAt: v.number(),
  }),

  // Conversaciones y contexto
  conversations: defineTable({
    userId: v.id("users"),
    personalityId: v.id("personalities"),
    recipientId: v.number(),
    recipientName: v.optional(v.string()),
    conversationStage: v.string(),
    messageCount: v.number(),
    lastActive: v.number(),
    responseRate: v.number(),
    engagementLevel: v.string(),
    status: v.string(),
    userProfile: v.object({
      responsePatterns: v.array(v.string()),
      preferredTopics: v.array(v.string()),
      timezone: v.optional(v.string()),
      activeHours: v.optional(v.array(v.number())),
    }),
    createdAt: v.number(),
  }),

  // Mensajes
  messages: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
    personalityId: v.id("personalities"),
    recipientId: v.number(),
    content: v.string(),
    type: v.string(), // 'manual' | 'auto_generated' | 'auto_response'
    triggerType: v.optional(v.string()),
    status: v.string(), // 'pending' | 'sent' | 'failed' | 'queued'
    sentAt: v.optional(v.number()),
    error: v.optional(v.string()),
    metadata: v.optional(v.object({
      confidence: v.number(),
      topics_detected: v.array(v.string()),
      emotion_tone: v.string(),
      alternatives: v.array(v.string()),
    })),
    engagement: v.optional(v.object({
      opened: v.boolean(),
      replied: v.boolean(),
      replyTime: v.optional(v.number()),
    })),
    createdAt: v.number(),
  }),

  // Reglas de automatización
  automationRules: defineTable({
    userId: v.id("users"),
    personalityId: v.id("personalities"),
    name: v.string(),
    isActive: v.boolean(),
    priority: v.number(),
    triggers: v.array(v.object({
      type: v.string(),
      conditions: v.any(),
    })),
    actions: v.array(v.object({
      type: v.string(),
      config: v.any(),
    })),
    limits: v.object({
      max_per_day: v.optional(v.number()),
      max_per_conversation: v.optional(v.number()),
      cooldown_minutes: v.optional(v.number()),
    }),
    createdAt: v.number(),
  }),

  // Queue de mensajes
  messageQueue: defineTable({
    userId: v.id("users"),
    messageId: v.id("messages"),
    personalityId: v.id("personalities"),
    scheduledFor: v.number(),
    attempts: v.number(),
    maxAttempts: v.number(),
    status: v.string(), // 'pending' | 'processing' | 'completed' | 'failed'
    error: v.optional(v.string()),
    createdAt: v.number(),
  }),
});

// Indexes para optimización
export const indexes = {
  conversations: ["userId", "personalityId", "recipientId", "status"],
  messages: ["userId", "conversationId", "personalityId", "status", "createdAt"],
  automationRules: ["userId", "personalityId", "isActive"],
  messageQueue: ["userId", "scheduledFor", "status"],
};
```

## 🔗 Integración con Fanplace API

### API Client

```typescript
// lib/fanplace/api.ts
class FanplaceAPI {
  constructor(private token: string) {}

  async sendMessage(payload: FanplaceMessagePayload): Promise<FanplaceResponse> {
    const response = await fetch('https://superchat.v3.fanplace.com/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://fanplace.com',
        'Referer': 'https://fanplace.com/'
      },
      body: JSON.stringify({
        id: payload.recipientId,
        text: payload.content,
        media: payload.media || [],
        preview: null,
        price: 0,
        draft: 0,
        schedule: new Date().toISOString(),
        schedule_on: false
      })
    });

    if (!response.ok) {
      throw new FanplaceAPIError(response.status, await response.text());
    }

    return await response.json();
  }

  async getConversations(): Promise<FanplaceConversation[]> {
    // Implementar obtención de conversaciones
  }

  async getThread(userId: number): Promise<FanplaceThread> {
    // Implementar obtención de thread específico
  }
}
```

### Rate Limiting & Error Handling

```typescript
// lib/fanplace/rateLimiter.ts
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 30; // 30 requests por minuto
  private readonly windowMs = 60 * 1000; // 1 minuto

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
  }
}

// Error handling
class FanplaceAPIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.isRetryable = [429, 500, 502, 503, 504].includes(status);
  }
}
```

## 🚀 Roadmap de Desarrollo

### v1.0 MVP (2-3 semanas)
**Core IA + Dashboard Básico**

- ✅ Setup Next.js + Convex + TypeScript
- ✅ Schema de base de datos completo
- ✅ 3 personalidades pre-configuradas (Sofía, Emma, Luna)
- ✅ Sistema básico de generación de mensajes
- ✅ Dashboard para gestión de personalidades
- ✅ Integración básica con Fanplace API
- ✅ Envío manual de mensajes con IA
- ✅ Gestión de tokens de usuario

### v1.1 Multi-Modal AI + Revenue Engine (2-3 semanas)
**IA Multimedia + Optimización de Ingresos**

- 🔄 **Multi-Modal AI**: Análisis de imágenes y videos
- 🔄 **Revenue Optimization Engine**: Tracking conversiones y upsells
- 🔄 **Human-in-the-Loop Compliance**: Sistema híbrido de aprobación
- 🔄 **Smart Media Responses**: Templates contextuales por tipo de media
- 🔄 **Conversion Tracking**: Métricas chat-to-tip y engagement-to-revenue
- 🔄 **Automated Upselling**: Identificación de momentos óptimos
- 🔄 Sistema de triggers automáticos
- 🔄 Auto-respuestas a mensajes nuevos
- 🔄 Queue system para mensajes

### v1.2 Automatización Avanzada (1-2 semanas)
**Motor de Automatización Inteligente**

- 🔄 Check-ins proactivos programados
- 🔄 Rate limiting inteligente
- 🔄 Context awareness avanzado
- 🔄 Conversation flows predefinidos
- 🔄 A/B testing de personalidades
- 🔄 Sistema de confianza/scoring

### v1.3 IA Conversacional Avanzada (2-3 semanas)
**Optimización Inteligente**

- 🔄 Learning de patrones de usuario
- 🔄 Optimización de respuestas basada en performance
- 🔄 Editor de personalidades custom
- 🔄 Análisis predictivo de engagement
- 🔄 Mejoras automáticas de personalidades

### v1.4 UX/Performance (1 semana)
**Mejoras de Experiencia**

- 🔄 UI/UX refinado
- 🔄 Performance optimizations
- 🔄 Mobile responsive
- 🔄 Error handling robusto
- 🔄 Loading states mejorados

### v2.0 Analytics & Growth (3-4 semanas)
**Análiticas y Escalabilidad**

- 📊 Dashboard de analytics completo
- 📊 Métricas de engagement por personalidad
- 📊 Revenue tracking
- 📊 Optimization insights
- 📊 Multi-usuario/teams
- 📊 API pública
- 📊 Webhooks para integraciones

## 🎯 Métricas de Éxito

### KPIs Core (v1.0)
- **Message Success Rate**: >95% mensajes enviados exitosamente
- **Response Generation Time**: <3 segundos promedio
- **User Adoption**: Dashboard usado diariamente
- **Personality Accuracy**: Responses mantienen tono consistente

### KPIs Avanzados (v1.1+)
- **Multi-Modal Success Rate**: >90% respuestas apropiadas a multimedia
- **Revenue Conversion**: >15% chat-to-tip conversion rate
- **Upsell Accuracy**: >80% identificación correcta de oportunidades
- **Automation Efficiency**: >80% mensajes automáticos exitosos
- **User Engagement**: Aumento en response rate de Fanplace
- **Conversation Quality**: Conversaciones duran >5 intercambios
- **ROI**: Aumento medible en ingresos del usuario (target: +40%)

### Métricas de IA (v1.2+)
- **Context Accuracy**: IA mantiene contexto >90% del tiempo
- **Personality Consistency**: Scoring consistency >85%
- **Learning Effectiveness**: Mejora en engagement over time
- **A/B Test Insights**: Identificar personalidades más efectivas

## 🥊 Análisis Competitivo

### Substy.ai - Competidor Principal

**Fortalezas de Substy.ai:**
- ✅ Mercado probado (OnlyFans)
- ✅ Revenue comprobado (110+ clientes en 8 meses)
- ✅ Multi-modal AI (lee imágenes/videos)
- ✅ Base de usuarios establecida
- ✅ Compliance workaround establecido

**Debilidades de Substy.ai:**
- ❌ Solo OnlyFans (platform lock-in)
- ❌ Personalidades genéricas
- ❌ Sistema reactivo vs proactivo
- ❌ Sin conversation flows estructurados
- ❌ Analytics limitados

### Ventajas Competitivas de CupidAI

#### 1. **Platform Agnostic** 🚀
- **CupidAI**: Fanplace + expansión futura (OnlyFans, Fansly, etc.)
- **Substy.ai**: Solo OnlyFans
- **Beneficio**: Mayor mercado direccionable, menos riesgo de platform dependency

#### 2. **Personalidades Superiores** 🤖
- **CupidAI**: Personalidades específicas con prompts refinados
- **Substy.ai**: IA entrenada genéricamente en chats
- **Beneficio**: Conversaciones más auténticas y engaging

#### 3. **Conversation Architecture** 💬
- **CupidAI**: Flujos conversacionales planificados y estructurados
- **Substy.ai**: Respuestas reactivas sin estrategia
- **Beneficio**: Mejor control del journey del usuario

#### 4. **Revenue Optimization Engine** 💰
- **CupidAI**: Sistema integrado de análisis y optimización
- **Substy.ai**: Básico tracking de conversiones
- **Beneficio**: Mayor ROI para usuarios

#### 5. **Open Ecosystem** 🔗
- **CupidAI**: APIs públicas, integraciones, extensibilidad
- **Substy.ai**: Sistema cerrado
- **Beneficio**: Escalabilidad y customización

### Estrategia de Posicionamiento

1. **"The Smart Alternative"**: Enfocarse en personalidades superiores
2. **"Multi-Platform Ready"**: Preparado para cualquier plataforma
3. **"Revenue-First Design"**: Optimizado para maximizar ingresos
4. **"Developer-Friendly"**: APIs y integraciones abiertas

### Roadmap Competitivo

**Corto Plazo (3 meses)**:
- Alcanzar feature parity con Substy.ai
- Superar en personalidades y conversation flows
- Lanzar en Fanplace con casos de éxito

**Medio Plazo (6 meses)**:
- Expandir a OnlyFans (competencia directa)
- Lanzar API pública
- Partnerships con agencias

**Largo Plazo (12 meses)**:
- Dominar el mercado multi-platform
- Convertirse en el estándar de la industria
- Acquisition opportunities

## 📋 Consideraciones de Implementación

### Seguridad
- Tokens Fanplace almacenados de forma segura
- Validación de inputs para evitar injection
- Rate limiting para evitar ban de Fanplace
- Logs detallados pero sin exponer tokens

### Performance
- Cache de respuestas IA frecuentes
- Lazy loading de componentes pesados
- Optimistic updates en UI
- Background processing para automación

### Escalabilidad
- Arquitectura modular para agregar nuevas personalidades
- Sistema de plugins para nuevas funcionalidades
- API design para futuras integraciones
- Database optimizado para múltiples usuarios

### Legal/Ética
- Disclaimer sobre uso de automatización
- Respeto a Terms of Service de Fanplace
- Privacy-first approach para datos de usuario
- Transparencia sobre uso de IA

---

## 📝 Notas de Desarrollo

### Prioridades de Implementación
1. **IA FIRST**: Sistema de personalidades es lo más crítico
2. **Core Functionality**: Envío de mensajes debe ser rock-solid
3. **User Experience**: Dashboard intuitivo y rápido
4. **Automatización**: Smart features que ahorren tiempo
5. **Analytics**: Insights para optimización (último)

### Decisiones Técnicas Clave
- **Convex over tradicional DB**: Menos setup, más velocidad de desarrollo
- **TypeScript strict**: Type safety desde día uno
- **Component-first**: UI reutilizable y mantenible
- **AI modular**: Fácil agregar nuevos modelos/providers
- **Queue-based messaging**: Confiabilidad y rate limiting

### Next Steps Inmediatos
1. Setup inicial del proyecto Next.js + Convex
2. Implementar schema de base de datos con campos multi-modal
3. Crear 3 personalidades base con capacidades multimedia
4. Setup básico de Fanplace API integration
5. MVP del dashboard de personalidades
6. Integrar OpenAI Vision API para análisis de imágenes
7. Implementar sistema de revenue tracking básico

### Diferenciadores Técnicos Inmediatos
- **Multi-Modal desde v1.0**: Análisis de imágenes desde el MVP
- **Revenue-First**: Tracking de conversiones desde día uno
- **TypeScript Strict**: Mejor developer experience que competidores
- **Real-time Updates**: Convex permite updates instantáneos
- **Scalable Architecture**: Preparado para múltiples plataformas