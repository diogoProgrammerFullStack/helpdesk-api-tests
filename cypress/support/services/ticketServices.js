import { get, post, put, del } from './api';
import { routes, routes_tickets } from '../routes';
import { faker } from '@faker-js/faker';

const endpoint = `${routes.baseUrl}${routes_tickets.create_tickets}`;

export function createTicket(userId = 1) {
  const payload = {
    userId: userId,
    description: faker.lorem.sentence(),
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  return post(endpoint, payload);
}

export function createTicketWithoutDescription(userId = 1) {
  const payload = {
    userId: userId,
    description: '',
    status: 'Open',
    createdAt: new Date().toISOString()
  };

  return post(endpoint, payload);
}

export function getTicketById(id) {
  return get(`${routes.baseUrl}${routes_tickets.tickets_list_and_del.replace(':id', id)}`);
}

export function deleteTicket(id) {
  return del(`${routes.baseUrl}${routes_tickets.tickets_list_and_del.replace(':id', id)}`);
}

export function updateTicketStatus(id, status) {
  const body = { status };
  return put(`${routes.baseUrl}${routes_tickets.tickets_put.replace(':id', id)}`, body);
}
