// Core utilities.
import {createAtom, createFq} from 'prax'
// Immutability utilities.
import {immute, replaceAtPath, mergeAtPath} from 'prax'

/**
 * State
 */

export const atom = createAtom(immute({
  stamp: null,
  key: null,
  persons: null
}))

export const {read, watch, stop} = atom

/**
 * FQ
 */

import factors from './factors'

const writer = read => next => ({type, value, path}) => {
  switch (type) {
    case 'set':
      next(replaceAtPath(read(), value, path))
      break
    case 'patch':
      next(mergeAtPath(read(), value, path || []))
      break
  }
}

export const fq = createFq(factors, writer)
export const send = fq(atom.read, atom.write)

send('init')

/**
 * Utils
 */

if (window.developmentMode) {
  window.atom = atom
  window.fq = fq
  window.send = send
}
