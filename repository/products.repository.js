import { connect } from './db.js'

async function insertProduct(product){
  const con = await connect()
  try{
    const sql = 'INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING product_id'
    const values = [product.name, product.description, product.value, product.stock, product.supplier_id]
    const res = await con.query(sql, values);
    return res.rows[0]
  }catch(err){
    throw err;
  }finally{
    con.release()
  }
}

async function getProducts(){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM products');
    return res.rows;
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function getProduct(id){
  const con = await connect()
  try{
    const res = await con.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return res.rows[0];
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function deleteProduct(id){
  const con = await connect()
  try{
    const res = await con.query('DELETE FROM products WHERE product_id = $1', [id]);
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

async function updateProduct(product, id){
  const con = await connect()
  try{
    const sql = 'UPDATE products SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 WHERE product_id = $6 RETURNING *'
    const value = [product.name, product.description, product.value, product.stock, product.supplier_id, id]
    const res = await con.query(sql, value)
    return res.rows
  }catch(err){
    throw err
  }finally{
    con.release()
  }
}

export default {insertProduct, getProducts, getProduct, deleteProduct, updateProduct}