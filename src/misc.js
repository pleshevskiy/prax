import {PathQuery, Query, Computation} from 'espo'
import {equal} from 'emerge'
import {testBy, isList, validate} from 'fpx'

export function byPath(observableRef, path) {
  return new PathQuery(observableRef, path, equal)
}

export function byQuery(observableRef, query) {
  return new Query(observableRef, query, equal)
}

export function computation(def) {
  return new Computation(def, equal)
}

export function on(argPattern, fun) {
  validate(argPattern, isList)
  return function on_(arg) {
    return testBy(arguments, argPattern) ? fun(...arguments) : arg
  }
}