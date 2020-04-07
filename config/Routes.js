module.exports = app => {
  
  app.route('/create/users')
  .post(app.controllers.Users.store)

  app.route('/session')
  .post(app.controllers.Users.index)
}