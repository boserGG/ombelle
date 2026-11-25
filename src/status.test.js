import assert from 'node:assert/strict'
import { status } from './status.js'

assert.equal(status(1, 10).label, 'Fermé · ouvre demain 9h30') // lundi
assert.equal(status(0, 12).label, 'Ouvert · jusqu’à 13h') // dimanche matin
assert.equal(status(0, 14).label, 'Fermé · ouvre mardi 9h30') // dimanche après-midi
assert.equal(status(2, 8).label, 'Fermé · ouvre à 9h30')
assert.equal(status(6, 18.9).open, true)
assert.equal(status(6, 19).label, 'Fermé · ouvre demain 9h')
console.log('status ok')
