import {newClientService, getClientsService, getClientService, deleteClientService, updateClientService} from '../services/clients.services.js'

async function newClient(req, res, next){
  try{
    const client = req.body;
    if(!client.name || !client.cpf || !client.phone || !client.email || !client.address){
      throw new Error('Insira todas as informações');
    }
    logger.info(`Post /clients - ${JSON.stringify(client)}`)
    res.status(200).send(await newClientService(client))
  }catch(err){
    next(err);
  }
}

async function returnClients(req, res, next){
  try{
    logger.info(`GET / - clients`)
    res.status(200).send(await getClientsService())
  }catch(err){
    next(err)
  }
}

async function returnClient(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    logger.info(`GET /clients - ${req.params.id}`)
    res.status(200).send(await getClientService(req.params.id))
  }catch(err){
    next(err)
  }
}

async function deleteClient(req, res, next){
  try{
    if(!req.params.id){
      throw new Error('Insira um id')
    }
    await deleteClientService(req.params.id)
    logger.info(`DELETE /clients - ${req.params.id}`)
    res.status(200).send('Deletado!')
  }catch(err){
    next(err)
  }
}

async function updateClient(req, res, next){
  try{
    const client = req.body;
   if(!client.name || !client.cpf || !client.phone || !client.email || !client.address){
      throw new Error('Insira todas as informações');
    }
    logger.info(`PUT /clients - ${req.params.id}`)
    res.status(200).send(await updateClientService(client, req.params.id))
  }catch(err){
    next(err)
  }
}

export {newClient, returnClients, returnClient, deleteClient, updateClient}