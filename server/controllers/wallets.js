//<!---=====--- Wallets Ctrl ---====--->

const getWallets = ( req, res, next ) => {
  const db = req.app.get('db');
  db.getWallets()
  .then( wallets => res.status(200).send( wallets ) )
  .catch( () => res.status(500).send() );
};

const getWalletByName = ( req, res, next ) => {
  const db = req.app.get('db');
  const { params } = req;
  db.getWalletByName([ params.walletname ])
  .then( wallet => res.status(200).send( wallet ) )
  .catch( () => res.status(500).send() );
};

module.exports = {
  getWallets,
  getWalletByName
}