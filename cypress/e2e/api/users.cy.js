import {
  createUser,
  userList,
  getUserById,
  deleteUser,
  updateUser,
  patchUser,
  createUserNullName,
  createUserDuplicate
} from '../../support/services/userServices';

import { validateErrorResponse } from '../../support/utils/errorValidator';
import { validateSchema } from '../../support/utils/schemaValidator';
import userSchema from '../../support/schemas/userSchema.json';
import successMessageSchema from '../../support/schemas/successMessageSchema.json';
import errorSchema from '../../support/schemas/errorSchema.json';

describe('Validação de contrato e funcionalidades - Users', () => {
  let userId;

  beforeEach(() => {
    createUser().then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });
  });

  afterEach(() => {
    deleteUser(userId);
  });

  it('Validar criação de um usuário com sucesso', () => {
    expect(userId).to.not.be.undefined;
    cy.log(`Usuário criado com ID: ${userId}`);
  });

  it('Validar listagem de usuários', () => {
    userList().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      cy.log(JSON.stringify(response.body));
    });
  });

  it('Validar busca de um usuário por ID com sucesso', () => {
    getUserById(userId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', userId);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('email');
      cy.log(JSON.stringify(res.body));
    });
  });

  it('Validar atualização de um usuário com sucesso', () => {
    const body = {
      name: 'Diogo QA Atualizando nome',
      email: 'diogo@atualizado.com'
    };
    updateUser(userId, body).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('User updated successfully.');
      cy.log(JSON.stringify(res.body));
    });
  });

  it('Validar exclusão de um usuário com sucesso', () => {
    deleteUser(userId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('User deleted successfully.');
      cy.log(`Usuário com ID ${userId} deletado`);
    });
  });

  // ############################# Negativos ############################# //

  it('Validar retorno de erro ao buscar usuário com ID vazio', () => {
    getUserById().then((res) => {
      validateErrorResponse(res, 404, 'User not found.');
      cy.log(JSON.stringify(res.body));
    });
  });

  it('Validar retorno de erro ao buscar usuário com ID inexistente', () => {
    getUserById('999').then((res) => {
      validateErrorResponse(res, 404, 'User not found.');
      cy.log(JSON.stringify(res.body));
    });
  });

  it('Validar retorno de erro ao tentar criar usuário sem nome e sem e-mail', () => {
    createUserNullName(userId).then((res) => {
      validateErrorResponse(res, 400, 'The fields name and email are required.');
      cy.log(JSON.stringify(res.body));
    });
  });

  it('Validar retorno de erro ao tentar criar usuário com dados duplicados', () => {
    createUserDuplicate(userId).then((res) => {
      validateErrorResponse(res, 409, 'A user with this name or email already exists.');
      cy.log(JSON.stringify(res.body));
    });
  });

  // ############################# Schema ############################# //

  it('Validar schema da resposta ao criar um usuário com sucesso (POST)', () => {
    createUser().then((res) => {
      expect(res.status).to.eq(201);
      validateSchema(userSchema, res.body);
    });
  });

  it('Validar schema da resposta ao buscar usuário por ID com sucesso (GET)', () => {
    getUserById(userId).then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(userSchema, res.body);
    });
  });

  it('Validar schema da resposta ao atualizar um usuário com sucesso (PUT)', () => {
    const body = {
      name: 'Diogo Atualizado',
      email: 'diogo.atualizado@example.com'
    };

    updateUser(userId, body).then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(successMessageSchema, res.body);
    });
  });

  it('Validar schema da resposta ao deletar um usuário com sucesso (DELETE)', () => {
    deleteUser(userId).then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(successMessageSchema, res.body);
    });
  });

  it('Validar schema da resposta de erro ao buscar usuário inexistente', () => {
    getUserById(999999).then((res) => {
      expect(res.status).to.eq(404);
      validateSchema(errorSchema, res.body);
    });
  });
});
