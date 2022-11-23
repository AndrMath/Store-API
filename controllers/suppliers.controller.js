import suppliersServices from '../services/suppliers.services.js'

async function newSupplier(req, res, next){
  try{
    const supplier = req.body;
    if(!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address){
      throw new Error('Insira todas as informações');
    }
    logger.info(`Post /suppliers - ${JSON.stringify(supplier)}`)
    res.status(200).send(await suppliersServices.newSupplierService(supplier))
  }catch(err){
    next(err);
  }
}

async function returnSuppliers(req, res, next){
  try{
    logger.info(`GET / - suppliers`)
    res.status(200).send(await suppliersServices.getSuppliersService())
  }catch(err){
    next(err)
  }
}

async function returnSupplier(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    logger.info(`GET /suppliers - ${req.params.id}`)
    res.status(200).send(await suppliersServices.getSupplierService(req.params.id))
  }catch(err){
    next(err)
  }
}

async function deleteSupplier(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    await suppliersServices.deleteSupplierService(req.params.id)
    logger.info(`DELETE /suppliers - ${req.params.id}`)
    res.status(200).send('Deletado!')
  }catch(err){
    next(err)
  }
}

async function updateSupplier(req, res, next){
  try{
    const supplier = req.body;
   if(!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address){
      throw new Error('Insira todas as informações');
    }
    logger.info(`PUT /suppliers - ${req.params.id}`)
    res.status(200).send(await suppliersServices.updateSupplierService(supplier, req.params.id))
  }catch(err){
    next(err)
  }
}

export default { newSupplier, returnSuppliers, returnSupplier, deleteSupplier, updateSupplier }