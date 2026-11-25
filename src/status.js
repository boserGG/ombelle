// Horaires de l'atelier (heure de Paris). day : 0 = dimanche … 6 = samedi. Heures en décimal (9.5 = 9h30).
export const HORAIRES = { 0: [9, 13], 2: [9.5, 19], 3: [9.5, 19], 4: [9.5, 19], 5: [9.5, 19], 6: [9.5, 19] }
export const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
export const fmt = (h) => (Number.isInteger(h) ? `${h}h` : `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, '0')}`)

export function status(day, h) {
  const t = HORAIRES[day]
  if (t && h >= t[0] && h < t[1]) return { open: true, label: `Ouvert · jusqu’à ${fmt(t[1])}` }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7
    const s = HORAIRES[d]
    if (!s || (i === 0 && h >= s[0])) continue
    const quand = i === 0 ? `à ${fmt(s[0])}` : i === 1 ? `demain ${fmt(s[0])}` : `${JOURS[d]} ${fmt(s[0])}`
    return { open: false, label: `Fermé · ouvre ${quand}` }
  }
}

export function parisNow(now = new Date()) {
  const p = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  return { day: p.getDay(), month: p.getMonth(), ...status(p.getDay(), p.getHours() + p.getMinutes() / 60) }
}
