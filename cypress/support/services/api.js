export function get(url) {
    return cy.request({
        method: 'GET',
        url,
        headers: {
            //Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    });
}

export function post(url, body) {
    return cy.request({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        body,
        failOnStatusCode: false
    });
}

export function put(url, body) {
  return cy.request({
    method: 'PUT',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    failOnStatusCode: false
  });
}

export function patch(url, body) {
  return cy.request({
    method: 'PATCH',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    failOnStatusCode: false
  });
}

export function del(url) {
  return cy.request({
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  });
}