/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                  NexusAI — config.js                        ║
 * ║                                                             ║
 * ║  ✅ এখানে কোনো API KEY নেই — সম্পূর্ণ নিরাপদ             ║
 * ║  ✅ GitHub Pages-এ public হলেও কোনো সমস্যা নেই            ║
 * ║                                                             ║
 * ║  শুধু এই দুটো জিনিস বদলাও:                                ║
 * ║    1. PROXY_URL  → তোমার Cloudflare Worker URL             ║
 * ║    2. ADMIN_PASSWORD → তোমার নিজের password               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

window.APP_CONFIG = {

  // ── 🔗 Cloudflare Worker URL (API key এখানে নেই!) ──────────
  // worker.js deploy করার পর এই URL টা বদলাও
  PROXY_URL: 'https://ai-chat-proxy.misbahulhaquemahin.workers.dev/',

  // ── 🔒 Admin Password ────────────────────────────────────────
  ADMIN_PASSWORD: 'admin1234',  // ← অবশ্যই বদলাও

  // ── 🏷️ App Info ──────────────────────────────────────────────
  APP_NAME:    'NexusAI',
  APP_TAGLINE: 'Your intelligent AI assistant',

  // ── 🆓 User দের জন্য Free Models ─────────────────────────────
  FREE_MODELS: [
    { id: 'arcee-ai/trinity-large-preview:free',     label: 'Trinity Large',      badge: 'New ✨'  },
    
  ],

  // ── 👑 Admin দের জন্য সব Models ──────────────────────────────
  ALL_MODELS: [
    { id: 'arcee-ai/trinity-large-preview:free',     label: 'Trinity Large',          badge: 'New ✨'   },
    { id: 'deepseek/deepseek-r1:free',               label: 'DeepSeek R1',            badge: 'Free'     },
    { id: 'meta-llama/llama-3.2-3b-instruct:free',   label: 'Llama 3.2 · 3B',        badge: 'Free'     },
    { id: 'meta-llama/llama-3.1-8b-instruct:free',   label: 'Llama 3.1 · 8B',        badge: 'Free'     },
    { id: 'google/gemma-3-12b-it:free',              label: 'Gemma 3 · 12B',          badge: 'Free'     },
    { id: 'mistralai/mistral-7b-instruct:free',      label: 'Mistral 7B',             badge: 'Free'     },
    { id: 'qwen/qwen-2.5-72b-instruct:free',         label: 'Qwen 2.5 · 72B',        badge: 'Free'     },
    { id: 'openai/gpt-4o',                           label: 'GPT-4o',                 badge: 'Premium'  },
    { id: 'openai/gpt-4o-mini',                      label: 'GPT-4o Mini',            badge: 'OpenAI'   },
    { id: 'anthropic/claude-3.5-sonnet',             label: 'Claude 3.5 Sonnet',      badge: 'Anthropic'},
    { id: 'anthropic/claude-3-haiku',                label: 'Claude 3 Haiku',         badge: 'Fast'     },
    { id: 'google/gemini-flash-1.5',                 label: 'Gemini Flash 1.5',       badge: 'Google'   },
    { id: 'google/gemini-pro-1.5',                   label: 'Gemini Pro 1.5',         badge: 'Google'   },
    { id: 'meta-llama/llama-3.1-405b-instruct',      label: 'Llama 3.1 · 405B',      badge: 'Huge'     },
    { id: 'perplexity/llama-3.1-sonar-large-128k-online', label: 'Sonar (Web Search)', badge: 'Search' },
  ],

  // ── 🤖 Default Model ─────────────────────────────────────────
  DEFAULT_MODEL: 'arcee-ai/trinity-large-preview:free',

  // ── 💬 Default System Prompt ─────────────────────────────────
  DEFAULT_SYSTEM_PROMPT: 'You are NexusAI, a helpful, accurate, and concise AI assistant. Respond in the user\'s language. Format code in markdown code blocks.',

};
