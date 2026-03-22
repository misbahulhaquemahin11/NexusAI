/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║           NexusAI — Cloudflare Worker (API Proxy)            ║
 * ║                                                               ║
 * ║  SETUP:                                                       ║
 * ║  1. Cloudflare → Workers & Pages → Create Worker             ║
 * ║  2. এই পুরো code টা paste করো                               ║
 * ║  3. Deploy করো                                               ║
 * ║  4. Settings → Variables and Secrets → Add:                  ║
 * ║       Name  : OPENROUTER_API_KEY                             ║
 * ║       Value : sk-or-v1-তোমার-আসল-key                        ║
 * ║  5. Worker URL টা copy করো → config.js এ দাও               ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

export default {
  async fetch(request, env) {

    // ── CORS Preflight ─────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    // ── শুধু POST allow ────────────────────────────────────────
    if (request.method !== 'POST') {
      return jsonResp({ error: 'Only POST requests are allowed.' }, 405);
    }

    // ── API Key আছে কিনা চেক ──────────────────────────────────
    if (!env.OPENROUTER_API_KEY) {
      return jsonResp({
        error: 'Server misconfigured: OPENROUTER_API_KEY secret is missing. Set it in Cloudflare Worker → Settings → Variables and Secrets.'
      }, 500);
    }

    // ── Request body পড়ো ──────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return jsonResp({ error: 'Invalid JSON in request body.' }, 400);
    }

    // ── OpenRouter API-তে forward করো ─────────────────────────
    try {
      const upstream = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + env.OPENROUTER_API_KEY,
            'HTTP-Referer':  request.headers.get('Referer') || 'https://nexusai.pages.dev',
            'X-Title':       'NexusAI',
          },
          body: JSON.stringify(body),
        }
      );

      // Streaming + non-streaming দুটোই কাজ করবে
      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          'Content-Type':  upstream.headers.get('Content-Type') || 'application/json',
          'Cache-Control': 'no-store',
          ...corsHeaders(),
        },
      });

    } catch (err) {
      return jsonResp({ error: 'Upstream error: ' + (err.message || 'Unknown') }, 502);
    }
  },
};

// ── CORS headers helper ────────────────────────────────────────
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// ── JSON response helper ───────────────────────────────────────
function jsonResp(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}
