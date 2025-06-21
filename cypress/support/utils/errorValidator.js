export function validateErrorResponse(response, expectedStatus, expectedMessage) {
  expect(response.status).to.eq(expectedStatus);
  expect(response.body).to.have.property('error');
  expect(response.body.error).to.eq(expectedMessage);
}