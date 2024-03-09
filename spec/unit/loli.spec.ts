import prisma from '@/__mocks__/db';
import { createUser } from '@/auth';

describe('test', () => {
  it('should loli', async () => {
    prisma.user.create.mockResolvedValue({
      id: 'asd',
      username: 'loli',
      password: 'asd',
      activated: false,
      createdAt: Date.now(),
      rememberDigest: 'asd'
    });

    const user = await createUser({ id: '12', username: 'loli', password: 'asdsad' });
    console.log(user);
    
  });
});
