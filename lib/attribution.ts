const STORAGE_KEY = 'gcm_attribution'
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

const ALL_PARAM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'fbclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid',
]

export type Attribution = Record<string, string>

function readStored(): Attribution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data: Attribution = JSON.parse(raw)
    if (data._ts && Date.now() - parseInt(data._ts) > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return {}
    }
    return data
  } catch {
    return {}
  }
}

function writeStored(data: Attribution): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, _ts: Date.now().toString() }))
  } catch {}
}

export function loadAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const fresh: Attribution = {}
  ALL_PARAM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) fresh[k] = v
  })

  if (Object.keys(fresh).length > 0) {
    const existing = readStored()
    writeStored({
      ...fresh,
      _first: existing._first || JSON.stringify(fresh),
      _source_page: window.location.pathname,
    })
    return { ...fresh, _source_page: window.location.pathname }
  }

  return readStored()
}

export function getCalendlyUtm(attr: Attribution) {
  return {
    utmSource: attr.utm_source || '',
    utmMedium: attr.utm_medium || '',
    utmCampaign: attr.utm_campaign || '',
    utmContent: attr.utm_content || '',
    utmTerm: attr.utm_term || '',
  }
}

export function appendUtmToUrl(url: string, attr: Attribution): string {
  if (!url || Object.keys(attr).filter((k) => !k.startsWith('_')).length === 0) return url
  try {
    const target = new URL(url, window.location.origin)
    ALL_PARAM_KEYS.forEach((k) => {
      if (attr[k]) target.searchParams.set(k, attr[k])
    })
    return target.toString()
  } catch {
    return url
  }
}

const CLICK_ID_KEYS = ['gclid', 'fbclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid']

export function buildCalendlyUrl(baseUrl: string, attr: Attribution): string {
  if (!baseUrl) return baseUrl
  try {
    const target = new URL(baseUrl)
    CLICK_ID_KEYS.forEach((k) => {
      if (attr[k]) target.searchParams.set(k, attr[k])
    })
    return target.toString()
  } catch {
    return baseUrl
  }
}

// Fire Google Ads conversion + optional GA4 event
export function fireConversion(label: string, ga4Event?: string): void {
  if (typeof window === 'undefined') return
  const g = (window as any).gtag
  if (g) {
    g('event', 'conversion', { send_to: `AW-17974346207/${label}` })
    if (ga4Event) g('event', ga4Event)
  }
}

// Listen to Calendly booking confirmation and fire conversion
// label: obtain from Google Ads → Conversions → your Calendly conversion action
export function listenCalendlyConversion(label: string, ga4Event = 'generate_lead'): () => void {
  const handler = (e: MessageEvent) => {
    if (e.data?.event === 'calendly.event_scheduled') {
      fireConversion(label, ga4Event)
    }
  }
  window.addEventListener('message', handler)
  return () => window.removeEventListener('message', handler)
}
