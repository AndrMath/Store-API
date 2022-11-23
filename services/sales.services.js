import salesRepository from "../repository/sales.repository.js";
import productsRepository from "../repository/products.repository.js"
import {getClient} from "../repository/clients.repository.js"

async function newSaleService(sale){
  const product = await productsRepository.getProduct(sale.product_id)
  if(product && await getClient(sale.client_id)){
    if(product.stock > 0){
      product.stock--;
      productsRepository.updateProduct(product)
      return await salesRepository.insertSale(sale)
    }
    throw new Error('Produto indisponível no momento')
  }
  throw new Error('Produto ou cliente não encontrados')
}

async function getSalesService(){
  return await salesRepository.getSales()
}

async function getSaleService(id){
  return await salesRepository.getSale(id)
}

async function deleteSaleService(id){
  const sale = await salesRepository.getSale(id);
  if (sale){
    await salesRepository.deleteSale(id);
    const product = await productsRepository.getProduct(sale.product_id);
    product.stock++;
    productsRepository.updateProduct(product);
  }
  throw new Error('Venda não encontrada')
}

async function updateSaleService(sale, id){
  const product = await productsRepository.getProduct(sale.product_id)
  if(product && await getClient(sale.client_id)){
    if(product.stock > 0){
      return await salesRepository.updateSale(sale, id)
    }
    throw new Error('Produto indisponível no momento')
  }
  throw new Error('Produto ou cliente não encontrados')
}

export default { newSaleService, getSalesService, getSaleService, deleteSaleService, updateSaleService }