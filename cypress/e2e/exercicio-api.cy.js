/// <reference types="cypress" />

import { fakerPT_BR as faker, fakerPT_BR } from '@faker-js/faker'
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        }) 
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(fakerPT_BR.person.fullName(), fakerPT_BR.internet.email(),'teste','true')
    .should((response) =>{
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('Fulano da Silva', 'beltrano@qa.com.br', 'teste', 'true')
    .should((response) =>{
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let nome = fakerPT_BR.person.fullName()
    let email = fakerPT_BR.internet.email()
    cy.cadastrarUsuario(nome, email, 'teste', 'false')
      .then(response =>{
        let id = response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
                "nome": nome,
                "email": email,
                "password": "teste",
                "administrador": "false"
                }
        }).then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro alterado com sucesso')
              })

      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let nome = fakerPT_BR.person.fullName()
    let email = fakerPT_BR.internet.email()
    cy.cadastrarUsuario(nome, email, 'teste', 'false')
      .then(response =>{
        let id = response.body._id
        cy.request({
          method:'DELETE',
          url:`usuarios/${id}`
        }).then(response => {
          expect(response.status).to.equal(200)
          expect(response.body.message).to.equal('Registro excluído com sucesso')
        })
      })
  });


});
