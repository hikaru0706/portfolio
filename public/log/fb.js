// ログ機能の共通モジュール（Firebase 初期化・カテゴリ定義・描画ヘルパー）
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js'

export const app = initializeApp({
  apiKey: 'AIzaSyA7lHx7ARqOvGgYosfYpc3jpHxd3OSL7j4',
  authDomain: 'hikaru-miyashita.firebaseapp.com',
  projectId: 'hikaru-miyashita',
  appId: '1:985596042491:web:c00c0966d1f92e5780245e',
})
export const db = getFirestore(app)

// 書き込みできるのはこのメールアドレスでログインした本人だけ（firestore.rules と合わせる）
export const OWNER_EMAIL = 'hikakin0706@gmail.com'

export const CATS = {
  study: { label: '勉強', color: '#1f4fd8', hours: true },
  dev:   { label: '開発', color: '#7c3aed', hours: true },
  work:  { label: '仕事', color: '#0e9f6e', hours: false },
  read:  { label: '読書', color: '#b45309', hours: true },
  sport: { label: '運動', color: '#dc2626', hours: false },
  life:  { label: '日常', color: '#0891b2', hours: false },
  other: { label: 'その他', color: '#64748b', hours: false },
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// 本文: エスケープしてから URL をリンクにし、改行を <br> にする
export function renderBody(text) {
  return esc(text)
    .replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
    .replace(/\n/g, '<br>')
}

export const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const WEEK = ['日', '月', '火', '水', '木', '金', '土']
export function fmtDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return `${m}/${d}（${WEEK[new Date(y, m - 1, d).getDay()]}）`
}
export const monthKey = (ymd) => ymd.slice(0, 7)
export const fmtMonth = (key) => `${key.slice(0, 4)}年${Number(key.slice(5, 7))}月`

export function fmtMinutes(min) {
  if (!min) return ''
  return min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, '0') + 'm' : ''}` : `${min}m`
}

export function renderEntry(e, { actions = '' } = {}) {
  const cat = CATS[e.cat] || CATS.other
  const tags = (e.tags || []).map((t) => `<span class="tag">#${esc(t)}</span>`).join('')
  return `<article class="entry${e.public ? '' : ' is-private'}" data-id="${esc(e.id)}">
    <div class="entry-head">
      <time>${fmtDate(e.date)}</time>
      <span class="chip" style="--c:${cat.color}">${cat.label}</span>
      ${e.minutes ? `<span class="mins">${fmtMinutes(e.minutes)}</span>` : ''}
      ${e.public ? '' : '<span class="private">非公開</span>'}
      ${actions}
    </div>
    <h3>${esc(e.title)}</h3>
    ${e.body ? `<p class="body">${renderBody(e.body)}</p>` : ''}
    ${e.url ? `<a class="link" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.url.replace(/^https?:\/\//, '').slice(0, 60))} ↗</a>` : ''}
    ${tags ? `<div class="tags">${tags}</div>` : ''}
  </article>`
}

export const toEntry = (snap) => ({ id: snap.id, ...snap.data() })
