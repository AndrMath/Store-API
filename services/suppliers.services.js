import suppliersRepository from "../repository/suppliers.repository.js";

async function newSupplierService(supplier){
  return await suppliersRepository.insertSupplier(supplier)
}

async function getSuppliersService(){
  return await suppliersRepository.getSuppliers()
}

async function getSupplierService(id){
  return await suppliersRepository.getSupplier(id)
}

async function deleteSupplierService(id){
  await suppliersRepository.deleteSupplier(id)
}

async function updateSupplierService(supplier, id){
  return await suppliersRepository.updateSupplier(supplier, id)
}

export default { newSupplierService, getSuppliersService, getSupplierService, deleteSupplierService, updateSupplierService }