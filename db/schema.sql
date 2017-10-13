CREATE TABLE wallets (
  walletid SERIAL PRIMARY KEY,
  walletname TEXT,
  walletreviews INTEGER,
  walletrating INTEGER,
  walletsecreviews INTEGER,
  walletsecrating INTEGER,
  walletanonreviews INTEGER,
  walletanonrating INTEGER,
  walleteasereviews INTEGER,
  walleteaserating INTEGER,
  walletesreviews INTEGER,
  walletesrating INTEGER,
);

CREATE TABLE coins (
  coinid SERIAL PRIMARY KEY,
  coinname TEXT,
  coinsymbol TEXT,
  coinrating INTEGER,
  coinreviews INTEGER,
);
