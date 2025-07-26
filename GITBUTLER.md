# GitButler + Claude Code: Flujo de Trabajo

## ¿Qué es GitButler?

GitButler es una herramienta que automatiza completamente el manejo de ramas y commits cuando trabajas con Claude Code. Elimina la necesidad de gestionar manualmente el control de versiones.

## Características Principales

- **Una rama por sesión**: Cada conversación con Claude Code crea automáticamente una nueva rama
- **Commits automáticos**: Se generan commits por cada ronda de cambios
- **Trabajo paralelo**: Permite múltiples features simultáneas sin conflictos
- **Sin worktrees**: No necesitas gestionar múltiples directorios de trabajo

## Configuración de Hooks Requerida

Agregar a `.claude/settings.json` o `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{
        "type": "command",
        "command": "but claude pre-tool"
      }]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write", 
      "hooks": [{
        "type": "command",
        "command": "but claude post-tool"
      }]
    }],
    "Stop": [{
      "matcher": "",
      "hooks": [{
        "type": "command", 
        "command": "but claude stop"
      }]
    }]
  }
}
```

## Comandos GitButler

- `but claude pre-tool`: Se ejecuta antes de cualquier edición de código
- `but claude post-tool`: Se ejecuta después de cualquier edición de código
- `but claude stop`: Se ejecuta al finalizar la sesión (hace commit final)

## Flujo de Trabajo

1. **Inicia sesión Claude Code**: GitButler detecta nueva sesión
2. **Crea rama automática**: Se genera una rama única para esta sesión
3. **Ediciones de código**: Cada cambio se trackea automáticamente
4. **Commits automáticos**: Se crean commits por cada ronda de chat
5. **Finaliza sesión**: `but claude stop` hace el commit final

## Reglas Importantes

⚠️ **NUNCA usar `git commit` manualmente** - GitButler maneja todo automáticamente

⚠️ **No hacer push manual** - GitButler controla cuándo sincronizar

⚠️ **Confiar en el sistema** - Deja que GitButler maneje branches y merges

## Beneficios

- ✅ Cero conflictos de merge
- ✅ Historial limpio y organizado  
- ✅ Múltiples features en paralelo
- ✅ Commits automáticos con contexto
- ✅ Ramas organizadas por sesión

## Instalación

1. Instalar GitButler CLI
2. Configurar hooks en Claude Code
3. Agregar reglas a CLAUDE.md para evitar commits manuales