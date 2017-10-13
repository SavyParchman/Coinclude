//<!---=====--- Users Ctrl ---====--->

const getUsers = ( req, res, next ) => {
  const db = req.app.get('db');
  db.getUsers()
  .then( users => res.status(200).send( users ) )
  .catch( () => res.status(500).send() );
};

const getUserByAuthId = (req, res, next) => {
  const db = req.app.get('db')
  db.getUserByAuthId([req.params.authid])
      .then(user => res.status(200).json(user))
      .catch(err => res.status(404).json(err))
};

module.exports = {
  getUsers,
  getUserByAuthId
}