import salesServices from "../services/sales.services.js";

async function newSale(req, res, next){
  try{
    const sale = req.body;
    if(!sale.value || !sale.date || !sale.client_id || !sale.product_id){
      throw new Error('Insira todas as informações');
    }
    logger.info(`Post /sales - ${JSON.stringify(sale)}`)
    res.status(200).send(await salesServices.newSaleService(sale))
  }catch(err){
    next(err);
  }
}

async function returnSales(req, res, next){
  try{
    logger.info(`GET / - sales`)
    res.status(200).send(await salesServices.getSalesService())
  }catch(err){
    next(err)
  }
}

async function returnSale(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    logger.info(`GET /sales - ${req.params.id}`)
    res.status(200).send(await salesServices.getSaleService(req.params.id))
  }catch(err){
    next(err)
  }
}

async function deleteSale(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    await salesServices.deleteSaleService(req.params.id)
    logger.info(`DELETE /sales - ${req.params.id}`)
    res.status(200).send('Deletado!')
  }catch(err){
    next(err)
  }
}

async function updateSale(req, res, next){
  try{
    const sale = req.body;
   if(!sale.value || !sale.date || !sale.client_id || !sale.product_id){
      throw new Error('Insira todas as informações');
    }
    logger.info(`PUT /sales - ${req.params.id}`)
    res.status(200).send(await salesServices.updateSaleService(sale, req.params.id))
  }catch(err){
    next(err)
  }
}

export default {newSale, returnSales, returnSale, deleteSale, updateSale}