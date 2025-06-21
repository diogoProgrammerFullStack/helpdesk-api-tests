import {
  createTicket,
  getTicketById,
  deleteTicket,
  updateTicketStatus,
  createTicketWithoutDescription,
} from '../../support/services/ticketServices';

import { validateErrorResponse } from '../../support/utils/errorValidator';
import { validateSchema } from '../../support/utils/schemaValidator';
import ticketSchema from '../../support/schemas/ticketSchema.json';
import successMessageSchema from '../../support/schemas/successMessageSchema.json';
import errorSchema from '../../support/schemas/errorSchema.json';

describe('Validação de contrato, funcionalidades e cenários negativos - Tickets', () => {
  let ticketId;

  beforeEach(() => {
    createTicket().then((response) => {
      expect(response.status).to.eq(201);
      ticketId = response.body.id;
    });
  });

  // ############################# Funcionais ############################# //

  it('Validar criação de um ticket com sucesso', () => {
    expect(ticketId).to.not.be.undefined;
    cy.log(`Ticket criado com ID: ${ticketId}`);
  });

  it('Validar busca de um ticket por ID com sucesso', () => {
    getTicketById(ticketId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', ticketId);
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('status', 'Open');
    });
  });

  it('Validar atualização do status de um ticket com sucesso', () => {
    updateTicketStatus(ticketId, 'Closed').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('Ticket status updated successfully.');
    });
  });

  it('Validar exclusão de um ticket com sucesso', () => {
    deleteTicket(ticketId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('Ticket deleted successfully.');
    });
  });

  // ############################# Negativos ############################# //

  it('Validar retorno de erro ao tentar criar ticket sem descrição', () => {
    createTicketWithoutDescription().then((response) => {
      validateErrorResponse(response, 400, 'The fields userId and description are required.');
    });
  });

  it('Validar retorno de erro ao buscar ticket com ID vazio', () => {
    getTicketById().then((res) => {
      validateErrorResponse(res, 404, 'Ticket not found.');
    });
  });

  it('Validar retorno de erro ao buscar ticket com ID inexistente', () => {
    getTicketById('999').then((res) => {
      validateErrorResponse(res, 404, 'Ticket not found.');
    });
  });

  it('Validar retorno de erro ao tentar deletar ticket com ID inexistente', () => {
    deleteTicket('999').then((res) => {
      validateErrorResponse(res, 404, 'Ticket not found.');
    });
  });

  it('Validar retorno de erro ao tentar deletar ticket com ID vazio', () => {
    deleteTicket().then((res) => {
      validateErrorResponse(res, 404, 'Ticket not found.');
    });
  });

  // ############################# Schema ############################# //

  it('Validar schema da resposta ao criar um ticket com sucesso (POST)', () => {
    createTicket().then((res) => {
      expect(res.status).to.eq(201);
      validateSchema(ticketSchema, res.body);
    });
  });

  it('Validar schema da resposta ao buscar ticket por ID com sucesso (GET)', () => {
    getTicketById(ticketId).then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(ticketSchema, res.body);
    });
  });

  it('Validar schema da resposta ao atualizar status de um ticket com sucesso (PUT)', () => {
    updateTicketStatus(ticketId, 'In Progress').then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(successMessageSchema, res.body);
    });
  });

  it('Validar schema da resposta ao deletar um ticket com sucesso (DELETE)', () => {
    deleteTicket(ticketId).then((res) => {
      expect(res.status).to.eq(200);
      validateSchema(successMessageSchema, res.body);
    });
  });

  it('Validar schema da resposta de erro ao buscar ticket inexistente', () => {
    getTicketById(999999).then((res) => {
      expect(res.status).to.eq(404);
      validateSchema(errorSchema, res.body);
    });
  });
});
