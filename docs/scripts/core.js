import {createAtom} from 'prax/ex'

/**
 * State
 */

const atom = createAtom({
  stamp: null,
  key: null,
  persons: null,
  updating: null,
  initing: false
})

export const {read, set, patch, subscribe, watch} = atom

/**
 * Compute Utils
 */

import {cond, collectionCond} from 'prax/effects'

export function when () {
  return watch(cond(...arguments))
}

export function whenOneOf () {
  return subscribe(collectionCond(...arguments))
}

/**
 * Render Utils
 */

import {Component} from 'react'
import {createAuto, createReactiveRender} from 'prax/react'

export const auto = createAuto(Component, watch)
export const reactiveRender = createReactiveRender(watch)

/**
 * App Logic
 */

require('./factors')

set(['initing'], true)

/**
 * Utils
 */

if (window.developmentMode) {
  window.atom = atom
  window.read = read
  window.set = set
  window.patch = patch
}
