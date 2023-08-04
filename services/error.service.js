
import { utilService } from './util.service.js'
import { DEV_URL } from '../config.js'


export const errorService = {
 logError
}

function logError(user, err, instance, info, routeHistory) {
 const errorToLog = _createNewError(user, err, instance, info, routeHistory)

 if (!import.meta.url.includes(DEV_URL)) {
  console.error('%cError', _getStyles(), errorToLog)
  return
 }
 console.info('%cError', _getStyles(), errorToLog)
}

/**
 * 
 * @param {object} user 
 * @param {string} err 
 * @param {string} instance 
 * @param {string} info 
 * @returns {{_id: string, desc: string, user: object, info: string, instance: string}} error object
 */
function _createNewError(user, err, instance, info, routeHistory) {
 return {
  _id: utilService.makeId(),
  desc: `[global handler ${err}]`,
  user,
  info,
  instance: instance.$.type.name,
  routeHistory

 }
}

/**
 * 
 * @returns {string} css styles
 */
function _getStyles() {
 return 'color:#fff; background:red; padding:5px; border-radius:5px; font-weight:bold'
}




