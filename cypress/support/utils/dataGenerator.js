import { faker } from '@faker-js/faker';

/**
 * Gera nome aleatório
 */
export function gerarNome() {
    return faker.person.fullName();
}

/**
 * Gera email aleatório
 */
export function gerarEmail() {
    return faker.internet.email().toLowerCase();
}
