import { connect } from './db.js'

async function insertClient(client){
  const con = await connect()
  try{
    const sql = 'INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING client_id'
    const values = [client.name, client.cpf, client.phone, client.email, client.address]
    const res = await con.query(sql, values);
    return res.rows[0]
  }catch(err){
    throw err;
  }finally{
    con.release()
  }
}

async function getClients(){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM clients');
    return res.rows;
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function getClient(id){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM clients WHERE client_id = $1', [id]);
    return res.rows[0];
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function deleteClient(id){
  const con = await connect()
  try{
    const res = await con.query('DELETE FROM clients WHERE client_id = $1', [id]);
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function updateClient(client, id){
  const con = await connect()
  try{
    const sql = 'UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE client_id = $6 RETURNING *'
    const value = [client.name, client.cpf, client.phone, client.email,client.address, id]
    const res = await con.query(sql, value)
    return res.rows
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}
  

/*const con = await connect()
  try{

  }catch(err){
    throw err
  }finally{
    con.release()
  }*/

export {insertClient, getClients, getClient, deleteClient, updateClient}