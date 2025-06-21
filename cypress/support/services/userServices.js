import { gerarNome, gerarEmail } from '../utils/dataGenerator';
import { routes } from '../routes';
import { post, get, del, patch, put } from './api';

const baseUrl = `${routes.baseUrl}${routes.users}`;

export function createUser() {
    const payload = {
        name: gerarNome(),
        email: gerarEmail()
    };

    return post(baseUrl, payload);
}

export function createUserNullName() {
    const payload = {
        name: '',
        email: ''
    };

    return post(baseUrl, payload);
}

export function createUserDuplicate() {
    const payload = {
        name: 'Teste6',
        email: 'teste6@hotmail.com'
    };

    return post(baseUrl, payload);
}

export function userList() {
    return get(baseUrl);
}

export function getUserById(id) {
  return get(`${baseUrl}/${id}`);
}

export function deleteUser(id) {
    const url = `${routes.baseUrl}${routes.users}/${id}`;
    return del(url);
}

export function updateUser(id, body) {
    const url = `${routes.baseUrl}${routes.users}/${id}`;
    return put(url, body);
}

export function patchUser(id, body) {
    const url = `${routes.baseUrl}${routes.users}/${id}`;
    return patch(url, body);
}
