import { utilService } from "./util.service.js"

export const userService = {
 getLoggedInUser,
 createLabel,
 addLabel
}

const USER_KEY = 'loggedInUser'

_createUser()

function getLoggedInUser() {
 return utilService.loadFromStorage(USER_KEY)

}

function addLabel(labelName) {
 const label = createLabel(labelName)
 const user = getLoggedInUser()
 user.labels = [...user.labels, label]
 utilService.saveToStorage(USER_KEY, user)
 console.debug('♠️ ~ file: user.service.js:22 ~ addLabel ~ user:', user)

}

function _createUser() {
 const user = {
  fullname: 'Tal Amit',
  username: 'tal.amit0311@gmail.com',
  labels: [
   createLabel('label 1'),
   createLabel('label 2'),
   createLabel('label 3')]
 }
 utilService.saveToStorage(USER_KEY, user)
}

function createLabel(name) {
 return {
  name,
  id: utilService.makeId()
 }
}
