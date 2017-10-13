//<!---=====--- Coins Ctrl ---====--->

const getCoins = ( req, res, next ) => {
  const db = req.app.get('db');
  db.getCoins()
  .then( coins => res.status(200).send( coins ) )
  .catch( () => res.status(500).send() );
};

const getCoinByName = ( req, res, next ) => {
  const db = req.app.get('db');
  const { params } = req;
  db.getCoinByName([ params.coinname ])
  .then( coin => res.status(200).send( coin ) )
  .catch( () => res.status(500).send() );
};

module.exports = {
  getCoins,
  getCoinByName
}