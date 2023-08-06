import { utilService } from "./util.service.js"

export const userService = {
  getLoggedInUser,
  createLabel,
  addLabel,
  updateLabel,
  addItemToUserList,
  removeItemFromUserList
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

function updateLabel(label, labelName) {
  const user = getLoggedInUser()
  const labelIdx = user.labels.findIndex(currLabel => currLabel.id === label.id)
  user.labels[labelIdx].name = labelName
  utilService.saveToStorage(USER_KEY, user)
  console.debug('♠️ ~ file: user.service.js:22 ~ addLabel ~ user:', user)
}

function _createUser() {
  let user = userService.getLoggedInUser() || null
  if (!user) {
    user = {
      fullname: 'Tal Amit',
      username: 'tal.amit0311@gmail.com',
      labels: [
        createLabel('label 1'),
        createLabel('label 2'),
        createLabel('label 3')],
      searchHistory: [],
      watchLater: [],
      likedVideos: [],
    }
    utilService.saveToStorage(USER_KEY, user)
  }
}

function createLabel(name) {
  return {
    name,
    id: utilService.makeId()
  }
}

function addItemToUserList(listName, item) {
  const user = getLoggedInUser()
  user[listName] = [...user[listName], item]
  utilService.saveToStorage(USER_KEY, user)
  console.debug('♠️ ~ file: user.service.js:22 ~ addLabel ~ user:', user)
}

function removeItemFromUserList(listName, itemId) {
  const user = getLoggedInUser()
  user[listName] = user[listName].filter(item => item.id !== itemId)
  utilService.saveToStorage(USER_KEY, user)
  console.debug('♠️ ~ file: user.service.js:22 ~ addLabel ~ user:', user)
}


