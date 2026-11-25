import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { ATELIERS, AVIS, BOUQUETS, ETAPES, MOIS, NAV, PH, SAISON, SERVICES, photo, srcSet } from './data'
import { HORAIRES, JOURS, fmt, parisNow } from './status'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
const MOTION = '(prefers-reduced-motion: no-preference)'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
let lenis = null

function go(e, hash) {
  e?.preventDefault()
  const el = hash === '#top' ? 0 : document.querySelector(hash)
  if (lenis) { lenis.start(); lenis.scrollTo(el, { duration: 1.5, offset: el === 0 ? 0 : -70 }) } // start : le menu met Lenis en pause
  else if (el === 0) window.scrollTo(0, 0)
  else el?.scrollIntoView()
}

function Img({ p, alt, sizes = '100vw', className = '', reveal = true, eager = false }) {
  return (
    <figure className={`img ${reveal ? 'reveal' : ''} ${className}`}>
      <img src={photo(p.id, 1200)} srcSet={srcSet(p.id)} sizes={sizes} alt={alt}
        loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
    </figure>
  )
}

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
)

// Pictogramme : une ombelle (tiges qui rayonnent depuis un même point).
const Logo = () => (
  <span className="logo">
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"><path d="M16 30V17M16 17 7 9M16 17l-5-10M16 17V5.5M16 17l5-10M16 17l9-8" /></g>
      <g fill="currentColor"><circle cx="7" cy="9" r="1.8" /><circle cx="11" cy="7" r="1.8" /><circle cx="16" cy="5.5" r="1.8" /><circle cx="21" cy="7" r="1.8" /><circle cx="25" cy="9" r="1.8" /></g>
    </svg>
    Ombelle
  </span>
)

const Label = ({ children }) => <p className="label" data-fade>{children}</p>

function useNow() {
  const [t, setT] = useState(parisNow)
  useEffect(() => {
    const id = setInterval(() => setT(parisNow()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Header({ open, setOpen, now }) {
  return (
    <header className="header">
      <a href="#top" className="header__logo" onClick={(e) => go(e, '#top')} aria-label="Ombelle, retour en haut"><Logo /></a>
      <nav className="header__nav hide-sm" aria-label="Navigation principale">
        {NAV.slice(0, 3).map((l) => <a key={l.id} href={l.id} className="link" onClick={(e) => go(e, l.id)}>{l.label}</a>)}
      </nav>
      <div className="header__end">
        <span className={`pill hide-xs ${now.open ? 'is-open' : ''}`}><i />{now.label}</span>
        <a href="#commander" className="btn btn--small hide-sm" onClick={(e) => go(e, '#commander')}>Commander</a>
        <button className="header__menu show-sm" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? 'Fermer' : 'Menu'}<span className={`burger ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>
  )
}

function Menu({ open, setOpen }) {
  const root = useRef(null)
  useGSAP(() => {
    const k = reduced() ? 0 : 1
    if (open) {
      lenis?.stop()
      gsap.timeline()
        .set(root.current, { visibility: 'visible' })
        .fromTo(root.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 * k, ease: 'expo.inOut' })
        .fromTo('.menu__link span', { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 0.9 * k, ease: 'expo.out' }, '-=0.4')
      root.current.querySelector('a')?.focus({ preventScroll: true })
    } else {
      lenis?.start()
      gsap.to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7 * k, ease: 'expo.inOut', onComplete: () => gsap.set(root.current, { visibility: 'hidden' }) })
    }
  }, { dependencies: [open], scope: root })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <div id="menu" className="menu" ref={root} role="dialog" aria-modal="true" aria-label="Navigation" inert={!open}>
      <nav>
        {NAV.map((l, i) => (
          <a key={l.id} href={l.id} className="menu__link" onClick={(e) => { setOpen(false); go(e, l.id) }}>
            <span><small>0{i + 1}</small>{l.label}</span>
          </a>
        ))}
      </nav>
      <p className="menu__foot">7 passage des Glycines, Bordeaux<br />Mardi → samedi 9h30 — 19h · Dimanche 9h — 13h</p>
    </div>
  )
}

function Hero() {
  const root = useRef(null)
  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      const split = SplitText.create('.hero__title', { type: 'lines,words', mask: 'lines' })
      gsap.timeline({ delay: 0.2 })
        .from(split.words, { yPercent: 120, duration: 1.4, ease: 'expo.out', stagger: 0.05 })
        .from('.hero__arch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)', duration: 1.6, ease: 'expo.inOut' }, 0)
        .from('.hero__arch img', { scale: 1.3, duration: 2.2, ease: 'expo.out' }, 0.2)
        .from('.hero [data-in]', { y: 24, opacity: 0, stagger: 0.08, duration: 1, ease: 'power3.out' }, 0.7)
        .from('.badge', { scale: 0.6, opacity: 0, duration: 1.2, ease: 'back.out(1.6)' }, 1)

      gsap.to('.hero__arch img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero__text', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    })
  }, { scope: root })

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__text">
        <p className="label" data-in>Atelier floral — Bordeaux, Chartrons</p>
        <h1 className="hero__title">Des fleurs de saison, <em>cueillies</em> tout près d’ici.</h1>
        <p className="hero__lead" data-in>Bouquets, abonnements et fleurs de mariage composés chaque matin avec les récoltes de trois producteurs girondins.</p>
        <div className="hero__ctas" data-in>
          <a href="#bouquets" className="btn" onClick={(e) => go(e, '#bouquets')}>Voir les bouquets <Arrow /></a>
          <a href="#services" className="link" onClick={(e) => go(e, '#services')}>Nos services</a>
        </div>
      </div>
      <div className="hero__visual">
        <figure className="hero__arch">
          <img src={photo(PH.vase.id, 1200)} srcSet={srcSet(PH.vase.id)} sizes="(max-width: 900px) 90vw, 40vw" alt="Un nuage de gypsophile dans un vase blanc" fetchPriority="high" />
        </figure>
        <svg className="badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="cercle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
          <text><textPath href="#cercle">Atelier floral · Bordeaux · depuis 2017 ·</textPath></text>
          <g transform="translate(44 44)" className="badge__logo"><g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"><path d="M16 30V17M16 17 7 9M16 17l-5-10M16 17V5.5M16 17l5-10M16 17l9-8" /></g></g>
        </svg>
      </div>
    </section>
  )
}

function Saison({ month }) {
  const fleurs = SAISON[month]
  return (
    <div className="saison" aria-label={`En ${MOIS[month]} à l’atelier : ${fleurs.join(', ')}`}>
      <p className="saison__tag">En {MOIS[month]}</p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k}>{fleurs.map((f) => <span key={f}>{f}<i>✿</i></span>)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Tige dessinée qui « pousse » au fil du défilement.
const Tige = () => (
  <svg className="tige" viewBox="0 0 120 420" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path data-draw pathLength="1" d="M62 418C58 340 66 250 60 120" />
      <path data-draw pathLength="1" d="M61 330C40 318 24 296 22 270c18 6 32 24 39 52" />
      <path data-draw pathLength="1" d="M62 250c20-10 34-30 36-54-18 6-30 22-36 48" />
      <path data-draw pathLength="1" d="M60 120 22 70M60 120 36 52M60 120 60 40M60 120l24-68M60 120l38-50" />
    </g>
    <g fill="currentColor" data-dots>
      {[[22, 70], [36, 52], [60, 40], [84, 52], [98, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" />)}
    </g>
  </svg>
)

function Manifeste() {
  return (
    <section className="manifeste">
      <Tige />
      <div className="manifeste__body">
        <Label>Notre façon de faire</Label>
        <p className="manifeste__text" data-words>
          Chez Ombelle, nous composons avec ce que la saison nous donne. Des fleurs cultivées en Gironde, des feuillages glanés, et cette retenue qui laisse chaque tige respirer.
        </p>
      </div>
    </section>
  )
}

function Bouquets({ onChoose }) {
  return (
    <section className="bouquets" id="bouquets">
      <div className="sec-head">
        <Label>La sélection de la semaine</Label>
        <h2 className="h2" data-lines>Quatre bouquets, <em>composés ce matin.</em></h2>
      </div>
      <ul className="cards">
        {BOUQUETS.map((b, i) => (
          <li key={b.nom} className="card" style={{ '--i': i }}>
            <Img p={b.p} alt={`Bouquet ${b.nom}`} sizes="(max-width: 700px) 85vw, (max-width: 1100px) 45vw, 24vw" className="card__img" />
            <div className="card__body" data-fade>
              <h3 className="card__nom">{b.nom}</h3>
              <p className="card__prix">dès {b.prix} €</p>
              <p className="card__notes">{b.notes}</p>
              <a href="#commander" className="card__cta" onClick={(e) => { onChoose(b.nom); go(e, '#commander') }}>Commander ce bouquet <Arrow /></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Atelier() {
  const root = useRef(null)
  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 5%', scrub: true } })
        .fromTo('.atelier__media', { clipPath: 'inset(0% 22% 0% 22% round 999px 999px 0px 0px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none' })
        .fromTo('.atelier__media img', { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
    })
  }, { scope: root })

  return (
    <section className="atelier" ref={root}>
      <figure className="atelier__media">
        <img src={photo(PH.atelier.id, 1800)} srcSet={srcSet(PH.atelier.id)} sizes="100vw" alt="Une fleuriste prépare un bouquet dans l’atelier, entourée de plantes" loading="lazy" />
        <figcaption className="atelier__cap">
          <p className="label">L’atelier</p>
          <p className="atelier__title" data-lines>Une boutique de quartier, <em>ouverte sur le jardin.</em></p>
        </figcaption>
      </figure>
    </section>
  )
}

function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="services" id="services">
      <div className="services__grid">
        <div className="services__head">
          <Label>Services</Label>
          <h2 className="h2" data-lines>Pour tous les jours, <em>et les grands.</em></h2>
          <div className="services__frame" aria-hidden="true">
            {SERVICES.map((s, i) => (
              <img key={s.titre} src={photo(s.p.id, 900)} alt="" loading="lazy" className={i === open ? 'is-active' : ''} />
            ))}
          </div>
        </div>
        <ul className="acc">
          {SERVICES.map((s, i) => {
            const on = i === open
            return (
              <li key={s.titre} className={`acc__item ${on ? 'is-open' : ''}`} data-fade>
                <button className="acc__btn" aria-expanded={on} aria-controls={`acc-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                  <span className="acc__n">0{i + 1}</span>
                  <span className="acc__titre">{s.titre}</span>
                  <span className="acc__plus" aria-hidden="true" />
                </button>
                <div className="acc__panel" id={`acc-${i}`} role="region" aria-label={s.titre}>
                  <div>
                    <img className="acc__img" src={photo(s.p.id, 600)} alt="" loading="lazy" />
                    <p>{s.texte}</p>
                    <p className="acc__info">{s.info}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Savoir() {
  return (
    <section className="savoir">
      <div className="sec-head sec-head--center">
        <Label>Savoir-faire</Label>
        <h2 className="h2" data-lines>Du champ <em>à votre table.</em></h2>
      </div>
      <ol className="etapes">
        {ETAPES.map((e, i) => (
          <li key={e.n} className="etape" data-speed={[0.06, -0.04, 0.1][i]}>
            <Img p={e.p} alt="" sizes="(max-width: 800px) 85vw, 30vw" className="etape__img" />
            <div data-fade>
              <span className="etape__n">{e.n}</span>
              <h3 className="etape__titre">{e.titre}</h3>
              <p>{e.texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Ateliers() {
  return (
    <section className="ateliers" id="ateliers">
      <div className="ateliers__grid">
        <div className="ateliers__head">
          <Label>Ateliers</Label>
          <h2 className="h2" data-lines>Apprendre <em>à composer.</em></h2>
          <p data-fade>Deux heures autour de la grande table de l’atelier, en petit groupe de huit personnes. Fleurs, outils et thé compris. Vous repartez avec votre création.</p>
          <Img p={PH.epis} alt="" sizes="(max-width: 900px) 60vw, 22vw" className="ateliers__img" />
        </div>
        <ul className="dates">
          {ATELIERS.map((a) => (
            <li key={a.date} className="date" data-fade>
              <span className="date__d"><small>{a.jour}</small>{a.date}</span>
              <span className="date__titre">{a.titre}</span>
              <span className="date__meta">{a.duree} · {a.prix} €</span>
              <span className={`date__etat ${a.places ? '' : 'is-full'}`}>{a.places ? `${a.places} places` : 'Complet'}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Avis() {
  const [i, setI] = useState(0)
  const [pause, setPause] = useState(false)
  useEffect(() => {
    if (pause || reduced()) return
    const id = setTimeout(() => setI((i + 1) % AVIS.length), 6500)
    return () => clearTimeout(id)
  }, [i, pause])

  return (
    <section className="avis" aria-roledescription="carrousel" aria-label="Avis de clients"
      onPointerEnter={() => setPause(true)} onPointerLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)}>
      <Label>Ils en parlent</Label>
      <div className="avis__stage" aria-live="polite">
        {AVIS.map((a, k) => (
          <figure key={a.auteur} className={`avis__item ${k === i ? 'is-active' : ''}`} aria-hidden={k !== i}>
            <blockquote>« {a.texte} »</blockquote>
            <figcaption><strong>{a.auteur}</strong> — {a.detail}</figcaption>
          </figure>
        ))}
      </div>
      <div className="avis__dots">
        {AVIS.map((a, k) => (
          <button key={a.auteur} className={`dot ${k === i ? 'is-active' : ''}`} aria-label={`Avis ${k + 1} sur ${AVIS.length}`} aria-current={k === i} onClick={() => setI(k)}>
            <span key={k === i ? `${i}-${pause}` : 'x'} className={pause ? 'is-paused' : ''} />
          </button>
        ))}
      </div>
    </section>
  )
}

function Commander({ choice, setChoice, now }) {
  const [sent, setSent] = useState(false)
  return (
    <section className="commander" id="commander">
      <div className="commander__grid">
        <div className="commander__info">
          <Label>Commander & nous trouver</Label>
          <h2 className="h2" data-lines>Passez à l’atelier, <em>ou écrivez-nous.</em></h2>
          <div className="infos" data-fade>
            <div><p className="label">Adresse</p><p>7 passage des Glycines<br />33000 Bordeaux</p></div>
            <div><p className="label">Écrire</p><p>bonjour@exemple.fr<br />@ombelle.atelier</p></div>
          </div>
          <table className="horaires" data-fade>
            <caption className="label">Horaires</caption>
            <tbody>
              {[2, 3, 4, 5, 6, 0, 1].map((d) => (
                <tr key={d} className={d === now.day ? 'is-today' : ''}>
                  <th scope="row">{JOURS[d]}</th>
                  <td>{HORAIRES[d] ? `${fmt(HORAIRES[d][0])} — ${fmt(HORAIRES[d][1])}` : 'Fermé'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="form" data-fade onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <label className="field"><span className="label">Votre nom</span><input required name="nom" autoComplete="name" placeholder="Prénom et nom" /></label>
          <label className="field"><span className="label">Bouquet</span>
            <select name="bouquet" value={choice} onChange={(e) => setChoice(e.target.value)}>
              {['Composition libre', ...BOUQUETS.map((b) => b.nom), 'Abonnement floral', 'Mariage ou événement'].map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label className="field"><span className="label">Date</span><input required type="date" name="date" /></label>
          <fieldset className="field chips">
            <legend className="label">Budget</legend>
            {[35, 50, 80, 120].map((b, k) => (
              <label key={b} className="chip"><input type="radio" name="budget" value={b} defaultChecked={k === 1} /><span>{b} €</span></label>
            ))}
          </fieldset>
          <label className="field"><span className="label">Un mot à joindre</span><textarea name="mot" rows="3" placeholder="Facultatif" /></label>
          <button className="btn btn--full" type="submit">Envoyer la demande <Arrow /></button>
          <p className="form__note" role="status">{sent ? 'Merci ! Ombelle est un commerce fictif : aucune demande n’a été envoyée.' : ''}</p>
        </form>
      </div>
    </section>
  )
}

const NOTICE_KEY = 'ombelle-notice-vu'
const seen = () => { try { return sessionStorage.getItem(NOTICE_KEY) } catch { return null } }

// Avertissement « projet fictif », affiché une fois par visite.
function Notice() {
  const ref = useRef(null)
  useEffect(() => {
    if (seen()) return
    const id = setTimeout(() => {
      const d = ref.current
      if (!d || d.open) return
      d.showModal()
      lenis?.stop()
      if (reduced()) return
      gsap.timeline()
        .from(d, { opacity: 0, duration: 0.5 })
        .from('.notice__card', { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0.1)
        .from('.notice__card > *', { y: 14, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, 0.35)
    }, 2200)
    return () => clearTimeout(id)
  }, [])

  const close = () => {
    try { sessionStorage.setItem(NOTICE_KEY, '1') } catch { /* navigation privée : on ignore */ }
    const d = ref.current
    const done = () => { d.close(); lenis?.start(); gsap.set(d, { clearProps: 'opacity' }) }
    if (reduced()) return done()
    gsap.to(d, { opacity: 0, duration: 0.4, ease: 'power2.inOut', onComplete: done })
  }

  return (
    <dialog ref={ref} className="notice" aria-labelledby="notice-title" aria-describedby="notice-desc"
      onCancel={(e) => { e.preventDefault(); close() }} onClick={(e) => e.target === ref.current && close()}>
      <div className="notice__card">
        <button className="notice__close" onClick={close} aria-label="Fermer l’avertissement">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
        <Logo />
        <h2 id="notice-title" className="notice__title">Cette boutique <em>n’existe pas.</em></h2>
        <p id="notice-desc">
          Ombelle est un site de présentation réalisé pour montrer ce que je peux créer pour un commerce : identité visuelle, animations et adaptation au mobile.
          Le nom, l’adresse, les prix, les avis, les ateliers et le formulaire de commande sont inventés.
        </p>
        <p className="notice__small">Les photos proviennent d’Unsplash, sous licence gratuite. Les personnes qui y apparaissent n’ont aucun lien avec ce projet.</p>
        <button className="btn" onClick={close}>Découvrir le site <Arrow /></button>
      </div>
    </dialog>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark" data-chars aria-label="Ombelle">Ombelle</p>
      <div className="footer__row">
        <p>© 2026 Ombelle — commerce fictif, site de présentation.</p>
        <p className="footer__credits">Photos Unsplash : {[...new Set(Object.values(PH).map((p) => p.by))].join(', ')}.</p>
        <a href="#top" className="link" onClick={(e) => go(e, '#top')}>Haut de page ↑</a>
      </div>
    </footer>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState('Composition libre')
  const now = useNow()

  useEffect(() => {
    if (reduced()) return
    lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null }
  }, [])

  useGSAP(() => {
    // Header : fond crème dès qu'on a quitté le haut de page.
    ScrollTrigger.create({ start: 40, end: 1e7, toggleClass: { targets: '.header', className: 'is-scrolled' } })

    gsap.matchMedia().add(MOTION, () => {
      gsap.from('.header > *', { opacity: 0, y: -10, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.5 })

      // Images : se dévoilent de haut en bas pendant le défilement, complètes au centre de l'écran.
      gsap.utils.toArray('.reveal').forEach((fig) => {
        gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top bottom', end: 'center center', scrub: true } })
          .fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' })
          .fromTo(fig.querySelector('img'), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
      })

      gsap.utils.toArray('[data-speed]').forEach((el) => {
        gsap.to(el, { yPercent: -100 * +el.dataset.speed, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      gsap.fromTo('.tige [data-draw]', { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0, stagger: 0.15, ease: 'none',
        scrollTrigger: { trigger: '.manifeste', start: 'top 80%', end: 'bottom 60%', scrub: true },
      })
      gsap.from('.tige [data-dots] circle', { scale: 0, transformOrigin: 'center', stagger: 0.08, duration: 0.8, ease: 'back.out(3)', scrollTrigger: { trigger: '.manifeste', start: 'center 55%' } })

      gsap.utils.toArray('[data-words]').forEach((el) => {
        const s = SplitText.create(el, { type: 'words' })
        gsap.from(s.words, { opacity: 0.15, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true } })
      })

      gsap.utils.toArray('[data-lines]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit: (s) => gsap.from(s.lines, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 88%' } }),
        })
      })

      gsap.utils.toArray('[data-chars]').forEach((el) => {
        const s = SplitText.create(el, { type: 'chars', mask: 'chars' })
        gsap.from(s.chars, { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 85%' } })
      })

      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 24, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
      })
    })
  })

  return (
    <>
      <a href="#bouquets" className="skip">Aller au contenu</a>
      <Header open={open} setOpen={setOpen} now={now} />
      <Menu open={open} setOpen={setOpen} />
      <main>
        <Hero />
        <Saison month={now.month} />
        <Manifeste />
        <Bouquets onChoose={setChoice} />
        <Atelier />
        <Services />
        <Savoir />
        <Ateliers />
        <Avis />
        <Commander choice={choice} setChoice={setChoice} now={now} />
      </main>
      <Footer />
      <Notice />
    </>
  )
}
