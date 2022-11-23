import productsRepository from "../repository/products.repository.js";
import supplierRepository from "../repository/suppliers.repository.js";

async function newProductService(product){
  if(await supplierRepository.getSupplier(parseInt(product.supplier_id))){
    return await productsRepository.insertProduct(product)
  }
  throw new Error ("Supplier não encontrado")
}

async function getProductsService(){
  return await productsRepository.getProducts()
}

async function getProductService(id){
  return await productsRepository.getProduct(id)
}

async function deleteProductService(id){
  await productsRepository.deleteProduct(id)
}

async function updateProductService(product, id){
  if(await supplierRepository.getSupplier(parseInt(product.supplier_id))){
    return await productsRepository.updateProduct(product, id)
  }
  throw new Error ("Supplier não encontrado")
}

export default {newProductService, getProductsService, getProductService, deleteProductService, updateProductService}