/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
import cors from 'cors';
import { uuid, isUuid } from 'uuidv4';

const app = express();
const { uuid } = require('uuidv4');

app.use(express.json());
app.use(cors());

let products = [{
  id: uuid(),
  code: 1,
  description: 'Teclado Gamer Multilaser',
  buyPrice: 30.00,
  sellPrice: 70.00,
  tags: ['perifericos', 'computador', 'gamer'],
  lovers: 0,
},
{
  id: uuid(),
  code: 2,
  description: 'Mousepad Gamer',
  buyPrice: 10.00,
  sellPrice: 30.00,
  tags: ['acessorios', 'gamer'],
  lovers: 0,
}];

app.get('/products', (request, response) => response.status(200).json(products));
  // TODO: listagem de todos os produtos


app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const product = request.body;
  let prod = { id:uuid(), ...product, lovers: 0}
  products.push(prod); 
  response.status(201).json(prod);

});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const id = request.params.id;
  const code = request.body.code;
  const description = request.body.description;
  const buyPrice = request.body.buyPrice;
  const sellPrice = request.body.sellPrice;
  const tags = request.body.tags;

  let product = products.find(value => value.id == id);
  if (product == undefined){
      response.status(400).send();
  }else{
      product.code = code;
      product.description = description;
      product.buyPrice = buyPrice;
      product.sellPrice = sellPrice;
      product.tags = tags;
      response.status(200).json(product);
  }
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const {code} = request.params;
  const index = products.findIndex(value => value.code == code); 
  if(index == -1){
      response.status(400).send();
  }else{
      products.splice(index,1);
      response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro

  let lovedProd = products.map(value =>
    (value.code == request.params.code? value.lovers+=1 : value));
  response.status(200).json(products);

});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;
  const product = products.filter(value => value.code == code);
  if(product == undefined){
      response.status(204).json({error: 'Requisição Inválida.'});
  }else {
      response.status(200).json(product);
  }
});

export default app;

/*
  × deve ser possível dar love em um produto (5003ms)
  × Um produto deverá herdar o número de lovers caso seu código já exista (5005ms)
  × Produtos de mesmo código devem compartilhar os lovers (5006ms)
*/
