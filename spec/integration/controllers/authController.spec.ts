import { findUserComments } from '@/auth';
import prisma from '@/db';

describe('authController', () => {
  it('should', async () => {
    const res = testRequest
      .post('/auth/register')
      .send({ username: 'kolos', password: 'mounakia', passwordRepeat: 'mounakia' });
    console.log((await res).text);

    const rees = testRequest.post('/auth/login').send({ username: 'kolos', password: 'mounakia' });
    console.log((await rees).text);
    const user = await prisma.user.findUnique({ where: { username: 'kolos' } });
    if (!user) {
      throw new Error('fuck');
    }

    const user2 = await prisma.user.create({ data: { username: 'braki', password: 'poutsoklanidi' } });
    const post = await prisma.post.create({
      data: { userId: user.id, title: 'test title', content: 'This is a sexy content' }
    });

    const post2 = await prisma.post.create({
      data: { userId: user.id, title: 'test title 1', content: 'This is a sexy content 2' }
    });

    const user2Post = await prisma.post.create({
      data: { userId: user2.id, title: 'test title', content: 'This is a sexy content' }
    });

    const user2Post2 = await prisma.post.create({
      data: { userId: user2.id, title: 'test title 1', content: 'This is a sexy content 2' }
    });

    const comment1 = await prisma.comment.create({ data: { postId: post.id, content: 'Comment1' } });
    const comment2 = await prisma.comment.create({ data: { postId: post2.id, content: 'Comment2' } });
    const user2comment1 = await prisma.comment.create({ data: { postId: user2Post.id, content: 'Comment1' } });
    const user2comment2 = await prisma.comment.create({ data: { postId: user2Post2.id, content: 'Comment2' } });
    console.log('QUERINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
    
    const query = await findUserComments(user);

    expect(1).toBe(1);
  });
});
