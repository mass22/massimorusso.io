# Configuration MCP pour Nuxt

Ce projet est configuré avec le support MCP (Model Context Protocol) pour améliorer l'assistance IA.

## Services MCP configurés

### 1. nuxt-mcp (Local)
- **URL**: `http://localhost:3000/mcp`
- **Description**: Serveur MCP local qui fournit des informations sur votre projet Nuxt
- **Fonctionnalités**:
  - Structure du projet
  - Composants Vue
  - Configuration Nuxt
  - Routes et pages

### 2. nuxt-ui (Remote)
- **URL**: `https://ui.nuxt.com/mcp`
- **Description**: Serveur MCP officiel de Nuxt UI
- **Fonctionnalités**:
  - Documentation des composants Nuxt UI
  - Exemples de code
  - Templates
  - Guides de migration

## Configuration Cursor

Le fichier `.cursor/mcp.json` contient la configuration pour Cursor :

```json
{
  "mcpServers": {
    "nuxt-mcp": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    },
    "nuxt-ui": {
      "type": "http",
      "url": "https://ui.nuxt.com/mcp"
    }
  }
}
```

## Utilisation

Une fois configuré, vous pouvez utiliser les assistants IA avec des commandes comme :

- `@nuxt-mcp` - Accéder aux informations de votre projet local
- `@nuxt-ui` - Accéder à la documentation Nuxt UI
- Poser des questions sur les composants, la structure du projet, etc.

## Prérequis

- Le serveur de développement Nuxt doit être en cours d'exécution (`npm run dev`)
- Cursor doit être configuré pour utiliser les serveurs MCP

## Redémarrage

Si vous modifiez la configuration MCP, redémarrez Cursor pour que les changements prennent effet.
