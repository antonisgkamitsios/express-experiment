describe('register', () => {
  describe('when fields are empty', async () => {
    it('should', async () => {
      const res = await testRequest
        .post('/auth/register')
        .send({ username: '', password: '', passwordRepeat: '' })
        .expect(400);

        expect(res.body.errors).toHaveLength(3)
        
    });
  });
});
