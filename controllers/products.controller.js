import productsServices from "../services/products.services.js";

async function newProduct(req, res, next){
  try{
    const product = req.body;
    if(!product.name || !product.description || !product.value || !product.stock || !product.supplier_id){
      throw new Error('Insira todas as informações');
    }
    logger.info(`Post /products - ${JSON.stringify(product)}`)
    res.status(200).send(await productsServices.newProductService(product))
  }catch(err){
    next(err);
  }
}

async function returnProducts(req, res, next){
  try{
    logger.info(`GET / - products`)
    res.status(200).send(await productsServices.getProductsService())
  }catch(err){
    next(err)
  }
}

async function returnProduct(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    logger.info(`GET /products - ${req.params.id}`)
    res.status(200).send(await productsServices.getProductService(req.params.id))
  }catch(err){
    next(err)
  }
}

async function deleteProduct(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    await productsServices.deleteProductService(req.params.id)
    logger.info(`DELETE /products - ${req.params.id}`)
    res.status(200).send('Deletado!')
  }catch(err){
    next(err)
  }
}

async function updateProduct(req, res, next){
  try{
    const product = req.body;
   if(!product.name || !product.description || !product.value || !product.stock || !product.supplier_id){
      throw new Error('Insira todas as informações');
    }
    logger.info(`PUT /products - ${req.params.id}`)
    res.status(200).send(await productsServices.updateProductService(product, req.params.id))
  }catch(err){
    next(err)
  }
}

export default {newProduct, returnProducts, returnProduct, deleteProduct, updateProduct}