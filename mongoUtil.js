var MongoClient = require( 'mongodb' ).MongoClient;

var db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect('mongodb://localhost:27017', { poolSize: 100 }, (err, client) => {
      db = client.db('mathubben');
      return callback( err );
    } );
  },

  getDb: function() {
    return db;
  }
};