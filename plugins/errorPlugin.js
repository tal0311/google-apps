import { routerHistory } from './../routes.js'
import { errorService } from '../services/error.service.js'
import { userService } from '../services/user.service.js'


export default {
 install: (app) => {
  app.config.errorHandler = (err, instance, info) => {
   let user = userService.getLoggedInUser()
   user = JSON.parse(JSON.stringify(user))
   errorService.logError(user, err, instance, info, routerHistory)
  }
 }
}