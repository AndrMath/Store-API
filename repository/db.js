import pg from 'pg'

async function connect(){
  if(global.connection){
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString: "postgres://zjmmyzak:41J_k9qu2MhHAKcDowTg8SKT9tnPf9QE@babar.db.elephantsql.com/zjmmyzak"
  })
  global.connection = pool;
  return pool.connect();
}

export {connect}