import { connect } from './db.js'

async function insertSale(sale){
  const con = await connect()
  try{
    const sql = 'INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING sale_id'
    const values = [sale.value, sale.date, sale.client_id, sale.product_id]
    const res = await con.query(sql, values);
    return res.rows[0]
  }catch(err){
    throw err;
  }finally{
    con.release()
  }
}

async function getSales(){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM sales');
    return res.rows;
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function getSale(id){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM sales WHERE sale_id = $1', [id]);
    return res.rows[0];
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function deleteSale(id){
  const con = await connect()
  try{
    const res = await con.query('DELETE FROM sales WHERE sale_id = $1', [id]);
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function updateSale(sale, id){
  const con = await connect()
  try{
    const sql = 'UPDATE sales SET value = $1, date = $2, client_id = $3, product_id = $4 WHERE sale_id = $5 RETURNING *'
    const value = [sale.value, sale.date, sale.client_id, sale.product_id, id]
    const res = await con.query(sql, value)
    return res.rows
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

  export default {insertSale, getSales, getSale, deleteSale, updateSale}