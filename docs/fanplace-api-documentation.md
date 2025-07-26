# Documentación de la API de Fanplace

## Resumen Ejecutivo

Este documento detalla los hallazgos de la investigación de la API de Fanplace para el envío de mensajes, incluyendo la arquitectura, autenticación, endpoints y estructura de datos necesaria.

## Arquitectura de la API

### Dominio Base
- **URL Principal:** `https://fanplace.com`
- **Arquitectura:** Microservicios con subdominios v3

### Subdominios de Microservicios
```
- authentication.v3.fanplace.com  → Autenticación y sesiones
- superchat.v3.fanplace.com      → Sistema de mensajería
- vault.v3.fanplace.com          → Gestión de medios
- dashboard.v3.fanplace.com      → Métricas y analytics
- notifications.v3.fanplace.com  → Sistema de notificaciones
- user.v3.fanplace.com          → Gestión de usuarios
```

## Autenticación

### Token JWT
- **Cookie:** `fpt` (Fanplace Token)
- **Formato:** JWT EdDSA
- **Estructura del Token:**
```json
{
  "alg": "EdDSA",
  "exp": 1756190641,
  "iat": 1753562641,
  "id": 1118057,
  "tk": "token_string"
}
```

### Headers de Autenticación
```javascript
{
  'Authorization': `Bearer ${fptToken}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

## Endpoint de Envío de Mensajes

### URL
```
POST https://superchat.v3.fanplace.com/send
```

### Estructura del Payload

```json
{
  "id": 1168574,           // ID del usuario destinatario
  "text": "hey!",          // Texto del mensaje
  "media": [],             // Array de archivos multimedia
  "preview": null,         // Vista previa (null por defecto)
  "price": 0,              // Precio (0 para mensajes gratuitos)
  "draft": 0,              // 0 = enviar, 1 = guardar como borrador
  "schedule": "2025-07-26T20:44:38.021Z",  // Timestamp ISO 8601
  "schedule_on": false     // false = enviar ahora, true = programar
}
```

### Campos Obligatorios
- `id`: ID numérico del usuario destinatario
- `text`: Contenido del mensaje (string)
- `media`: Array vacío si no hay multimedia
- `preview`: null o objeto de vista previa
- `price`: Número entero (0 para mensajes gratuitos)
- `draft`: Número entero (0 o 1)
- `schedule`: Timestamp en formato ISO 8601
- `schedule_on`: Boolean

### Respuesta Exitosa
```json
{
  "success": true
}
```
- **Status HTTP:** 200 OK

## Otros Endpoints Importantes

### Obtener Conversaciones
```
GET https://superchat.v3.fanplace.com/conversations
```

### Obtener Thread Específico
```
GET https://superchat.v3.fanplace.com/threads/{userId}
```

### Información del Usuario
```
GET https://user.v3.fanplace.com/info/{userId}
```

## Implementación en JavaScript

### Ejemplo de Función para Enviar Mensaje

```javascript
async function sendFanplaceMessage(userId, messageText, authToken) {
  const payload = {
    id: userId,
    text: messageText,
    media: [],
    preview: null,
    price: 0,
    draft: 0,
    schedule: new Date().toISOString(),
    schedule_on: false
  };

  const response = await fetch('https://superchat.v3.fanplace.com/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${await response.text()}`);
  }

  return await response.json();
}
```

### Obtener Token de Autenticación

```javascript
function getFanplaceToken() {
  // En el navegador
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('fpt='))
    ?.split('=')[1];
  
  return token;
}
```

## Manejo de Errores Comunes

### Error 400 - Bad Request
Causas comunes:
- Campo faltante en el payload
- Tipo de dato incorrecto (ej: boolean en lugar de integer)
- Estructura incorrecta del JSON

### Error 401 - Unauthorized
- Token expirado o inválido
- Token no incluido en el header Authorization

### Error 404 - Not Found
- Usuario destinatario no existe
- Endpoint incorrecto

## Notas de Implementación

1. **Timestamps**: Siempre usar formato ISO 8601 para el campo `schedule`
2. **Tipos de Datos**: 
   - `draft` debe ser integer (0 o 1), no boolean
   - `price` debe ser integer, no float
3. **Media**: Para mensajes sin multimedia, enviar array vacío `[]`
4. **Schedule**: Aunque `schedule_on` sea false, el campo `schedule` es obligatorio

## Integración con CupidAI CLI

Para integrar esta funcionalidad en el proyecto CupidAI:

1. Crear un módulo de autenticación para manejar tokens
2. Implementar la función de envío de mensajes
3. Añadir manejo de errores robusto
4. Considerar implementar rate limiting
5. Añadir logging para debugging

## Seguridad

- Nunca hardcodear tokens en el código
- Usar variables de entorno para credenciales
- Implementar renovación automática de tokens
- Validar inputs antes de enviar a la API

## Análisis de Viabilidad del Dashboard

### Confirmación de Funcionamiento
- ✅ **SÍ FUNCIONA**: La API acepta tokens JWT válidos
- **Duración del Token**: ~7 meses (desde iat hasta exp)
- **Viabilidad Técnica**: Confirmada para crear un dashboard funcional

### Análisis del Token JWT
```json
{
  "iat": 1753562641,  // 26 enero 2025
  "exp": 1756190641,  // 25 agosto 2025
  "id": 1118057,      // ID del usuario
  "tk": "token_string"
}
```
- **Algoritmo**: EdDSA (más seguro que RS256)
- **Duración máxima**: Aproximadamente 7 meses
- **Sin renovación automática**: Usuario debe actualizar manualmente

## Arquitectura del Dashboard: Web App Full-Stack

### Backend (Node.js + Express)

#### Componentes Principales
1. **API Proxy Server**
   - Evita problemas de CORS
   - Reenvía peticiones a Fanplace API
   - Añade headers necesarios
   - Maneja respuestas y errores

2. **Sistema de Autenticación**
   - JWT propio para el dashboard
   - Sesiones de usuario
   - Control de acceso

3. **Base de Datos (PostgreSQL)**
   ```sql
   -- Tabla de usuarios
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE,
     password_hash VARCHAR(255),
     created_at TIMESTAMP
   );

   -- Tabla de tokens encriptados
   CREATE TABLE fanplace_tokens (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     encrypted_token TEXT,
     token_expires_at TIMESTAMP,
     created_at TIMESTAMP
   );
   ```

4. **Sistema de Encriptación**
   ```javascript
   const crypto = require('crypto');
   const algorithm = 'aes-256-gcm';
   
   function encryptToken(token, masterKey) {
     const iv = crypto.randomBytes(16);
     const cipher = crypto.createCipheriv(algorithm, masterKey, iv);
     // ... implementación completa
   }
   ```

5. **Queue System**
   - Bull/Redis para manejo de colas
   - Rate limiting automático
   - Retry en caso de fallos

### Frontend (Next.js)

#### Páginas Principales
1. **Login/Register** (`/auth`)
   - Autenticación segura
   - Registro de nuevos usuarios

2. **Dashboard** (`/dashboard`)
   - Gestión de token Fanplace
   - Estado del token (válido/expirado)
   - Métricas de uso

3. **Mensajería** (`/messages`)
   - Lista de destinatarios
   - Formulario de envío
   - Historial de mensajes
   - Programación de envíos

4. **Configuración** (`/settings`)
   - Actualizar token
   - Preferencias de usuario
   - Notificaciones

## Retos Técnicos y Soluciones

### 1. CORS (Cross-Origin Resource Sharing)
**Problema**: La API de Fanplace bloqueará requests directos desde el navegador
**Solución**: 
```javascript
// Backend proxy endpoint
app.post('/api/fanplace/send', async (req, res) => {
  const userToken = await decryptToken(req.user.id);
  
  const response = await fetch('https://superchat.v3.fanplace.com/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
      'Origin': 'https://fanplace.com',
      'Referer': 'https://fanplace.com/'
    },
    body: JSON.stringify(req.body)
  });
  
  res.json(await response.json());
});
```

### 2. Seguridad del Token
**Problema**: Los tokens contienen información sensible del usuario
**Solución**:
- Encriptación AES-256-GCM en base de datos
- Variables de entorno para master key
- Nunca exponer tokens en logs o respuestas
- HTTPS obligatorio en producción

### 3. Rate Limiting
**Problema**: Fanplace puede tener límites de requests por minuto
**Solución**:
```javascript
const rateLimit = require('express-rate-limit');

const fanplaceLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // 30 requests por minuto
  message: 'Demasiadas solicitudes, intenta más tarde'
});

app.use('/api/fanplace/', fanplaceLimit);
```

### 4. Detección de Automatización
**Problema**: Fanplace podría detectar y bloquear patrones de bot
**Solución**:
- Headers realistas que imiten navegador real
- Delays aleatorios entre 1-3 segundos
- User-Agent rotativo
- Distribución natural de horarios de envío

### 5. Expiración de Tokens
**Problema**: Tokens expiran después de ~7 meses sin renovación automática
**Solución**:
- Sistema de notificaciones 30 días antes de expirar
- Dashboard muestra días restantes
- Proceso guiado para actualizar token

### 6. Consideraciones Legales
**Riesgo**: Uso no autorizado de la API podría violar ToS
**Mitigación**:
- Disclaimer claro sobre responsabilidad del usuario
- No almacenar credenciales de Fanplace
- Solo almacenar tokens con consentimiento
- Límites conservadores de uso

## Opciones de Almacenamiento Seguro

### Implementación Recomendada: PostgreSQL + Encriptación

```javascript
const crypto = require('crypto');

class TokenEncryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.masterKey = Buffer.from(process.env.MASTER_KEY, 'hex');
  }

  encrypt(token) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.masterKey, iv);
    
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.masterKey,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

### Seguridad Adicional
1. **Rotación de Keys**: Rotar master key cada 90 días
2. **Auditoría**: Log de acceso a tokens (sin exponer el token)
3. **2FA**: Autenticación de dos factores para el dashboard
4. **IP Whitelisting**: Opcional para mayor seguridad

## Plan de Implementación Detallado

### Fase 1: Setup Inicial (Semana 1)
1. Configurar repositorio y estructura del proyecto
2. Setup de Next.js y Express
3. Configurar PostgreSQL y migraciones
4. Implementar sistema de autenticación básico

### Fase 2: Backend Core (Semana 2)
1. Implementar encriptación de tokens
2. Crear endpoints proxy para Fanplace API
3. Sistema de logging y monitoreo
4. Rate limiting y queue system

### Fase 3: Frontend Dashboard (Semana 3)
1. Diseño UI/UX del dashboard
2. Páginas de autenticación
3. Gestión de tokens
4. Interfaz de mensajería

### Fase 4: Integración y Testing (Semana 4)
1. Integración completa frontend-backend
2. Testing con tokens reales
3. Manejo de errores exhaustivo
4. Optimización de performance

### Fase 5: Seguridad y Deployment (Semana 5)
1. Auditoría de seguridad
2. Configuración de producción
3. CI/CD pipeline
4. Documentación de usuario

### Stack Tecnológico
- **Backend**: Node.js, Express, PostgreSQL, Redis
- **Frontend**: Next.js 14, React, TailwindCSS, shadcn/ui
- **Autenticación**: JWT, bcrypt
- **Deployment**: Vercel (frontend), Railway (backend)
- **Monitoreo**: Sentry, LogRocket

## Alternativas y Recomendaciones

### Por qué Web App Full-Stack es la Mejor Opción

1. **Control Total**: Gestión completa de seguridad y datos
2. **Escalabilidad**: Puede crecer con múltiples usuarios
3. **Monetización**: Posibilidad de modelo SaaS
4. **Actualizaciones**: Fácil de actualizar sin redistribuir
5. **Analytics**: Métricas detalladas de uso

### Mejores Prácticas
1. **Transparencia**: Informar claramente sobre el uso de tokens
2. **Seguridad First**: Encriptación en todos los niveles
3. **UX Simple**: Interfaz intuitiva para usuarios no técnicos
4. **Documentación**: Guías claras de uso
5. **Soporte**: Sistema de tickets para problemas

### Consideraciones Éticas
- Respetar la privacidad de los usuarios
- No almacenar mensajes enviados
- Permitir eliminación completa de datos
- Cumplir con GDPR/CCPA

## Conclusión

La implementación de un dashboard web full-stack para gestionar mensajes de Fanplace es técnicamente viable y puede proporcionar una solución robusta y segura. La arquitectura propuesta balancea seguridad, usabilidad y mantenibilidad, mientras mitiga los riesgos técnicos y legales identificados. Con la implementación correcta de encriptación y medidas de seguridad, el sistema puede operar de manera confiable respetando la privacidad del usuario.