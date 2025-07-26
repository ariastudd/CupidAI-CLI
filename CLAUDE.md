# Instrucciones para Claude Code - CupidAI CLI

## Flujo de Trabajo con GitButler

Este proyecto utiliza **GitButler** para manejo automático de control de versiones. Es CRÍTICO seguir estas reglas:

### ⚠️ REGLAS OBLIGATORIAS - NO VIOLAR

#### 1. NUNCA usar comandos git manualmente
```bash
# ❌ PROHIBIDO - GitButler lo maneja automáticamente
git commit
git push
git merge
git checkout
git branch
```

**¿Por qué?** GitButler crea automáticamente una rama separada para cada sesión de Claude Code. Los commits manuales interfieren con este sistema y pueden causar conflictos o perder el historial organizado.

#### 2. Confiar en GitButler Hooks
Los siguientes hooks están configurados y SE EJECUTAN AUTOMÁTICAMENTE:

- `but claude pre-tool`: Antes de cualquier edición
- `but claude post-tool`: Después de cualquier edición  
- `but claude stop`: Al finalizar la sesión

**¿Por qué?** Estos hooks le dicen a GitButler exactamente cuándo se están haciendo cambios, permitiendo que asigne el trabajo a la rama correcta y haga commits con el contexto apropiado.

#### 3. Una sesión = Una rama automática
Cada conversación con Claude Code genera automáticamente:
- Nueva rama única identificada por session ID
- Commits por cada ronda de cambios
- Mensaje de commit basado en el prompt inicial

**¿Por qué?** Esto permite trabajar en múltiples features simultáneamente sin conflictos, mantiene el historial limpio, y facilita la revisión de cada feature por separado.

### 📋 Flujo de Trabajo Paso a Paso

1. **Inicio de sesión**: GitButler detecta nueva conversación y crea rama
2. **Hacer cambios**: Claude Code edita archivos normalmente
3. **Hooks automáticos**: 
   - `pre-tool` → "Voy a editar archivo X"
   - `post-tool` → "Terminé de editar archivo X"
4. **Finalizar**: `but claude stop` hace commit final con resumen
5. **Resultado**: Rama limpia lista para review/merge

### 🎯 Beneficios del Sistema

- ✅ **Cero conflictos**: Cada feature en su propia rama
- ✅ **Historial claro**: Un commit por ronda de chat
- ✅ **Trabajo paralelo**: Múltiples features simultáneas
- ✅ **Context-aware**: Commits incluyen el prompt original
- ✅ **Automated**: No gestión manual de branches

### 🚨 Problemas Comunes a Evitar

#### ❌ "Voy a hacer un commit para guardar el progreso"
**NO HACER** - GitButler ya está haciendo commits automáticamente

#### ❌ "Necesito cambiar de rama para trabajar en otra feature"
**NO HACER** - Inicia nueva sesión Claude Code y GitButler creará nueva rama

#### ❌ "Voy a hacer push para sincronizar"
**NO HACER** - GitButler controla cuándo hacer push

### 📖 Referencias

- Ver `GITBUTLER.md` para documentación técnica completa
- Configuración de hooks en `~/.claude/settings.json`
- Instalación GitButler CLI requerida

### 🔧 Desarrollo del CLI

Este proyecto es un CLI para CupidAI con:
- **Ejecutable**: `bin/cupidai.js`
- **Comandos**: `init`, `status`  
- **Dependencias**: commander, chalk, inquirer

#### Comandos de desarrollo:
```bash
npm start          # Ejecutar CLI
node bin/cupidai.js # Ejecutar directamente
```

### 💡 Filosofía del Proyecto

- **Modularidad**: Mantener componentes separados y reutilizables
- **Automatización**: Dejar que GitButler maneje el control de versiones
- **Claridad**: Un feature = una rama = una conversación
- **Eficiencia**: Foco en desarrollar, no en gestionar git

---

**Recordatorio**: Este archivo debe mantenerse actualizado con cualquier cambio en el flujo de trabajo o configuración del proyecto.