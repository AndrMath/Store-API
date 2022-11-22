import {insertClient, getClients, getClient, deleteClient, updateClient} from '../repository/clients.repository.js'

async function newClientService(client){
  return await insertClient(client)
}

async function getClientsService(){
  return await getClients()
}

async function getClientService(id){
  return await getClient(id)
}

async function deleteClientService(id){
  await deleteClient(id)
}

async function updateClientService(client, id){
  return await updateClient(client, id)
}

export {newClientService, getClientsService, getClientService, deleteClientService, updateClientService}