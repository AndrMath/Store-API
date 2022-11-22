import { connect } from './db.js'

async function insertSupplier(supplier){
  const con = await connect()
  try{
    const sql = 'INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING supplier_id'
    const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address]
    const res = await con.query(sql, values);
    return res.rows[0]
  }catch(err){
    throw err;
  }finally{
    con.release()
  }
}

async function getSuppliers(){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM suppliers');
    return res.rows;
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function getSupplier(id){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM suppliers WHERE supplier_id = $1', [id]);
    return res.rows[0];
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function deleteSupplier(id){
  const con = await connect()
  try{
    const res = await con.query('DELETE FROM suppliers WHERE supplier_id = $1', [id]);
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function updateSupplier(supplier, id){
  const con = await connect()
  try{
    const sql = 'UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *'
    const value = [supplier.name, supplier.cnpj, supplier.phone, supplier.email,supplier.address, id]
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

  export {insertSupplier, getSuppliers, getSupplier, deleteSupplier, updateSupplier}