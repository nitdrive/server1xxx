module.exports = {
  
  //db: process.env.MONGODB || 'mongodb://localhost:27017/schoolmateDB',
   //db: process.env.MONGODB || 'mongodb://localhost:27017/nodelabs',
  db: process.env.MONGODB || 'mongodb://admin:schoolmate123@ds029803.mongolab.com:29803/schoolmatedb1',
  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'MAX1234'
  },

  sessionSecret: process.env.SESSION_SECRET || '123455@NODELABS',

  
};

