describe('authController', () => {
  it('should', async () => {
    const res = testRequest
      .post('/auth/register')
      .send({ username: 'kolos', password: 'mouni', passwordRepeat: 'mouni' });
    console.log((await res).text);

    const rees = testRequest.post('/auth/login').send({ username: 'kolos', password: 'mouni' });
    console.log((await rees).text);

    expect(1).toBe(1);
  });
});
