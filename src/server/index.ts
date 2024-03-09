import { port } from '@/environment';
import { createApp } from '@/server/createApp';

async function startServer() {
  const app = await createApp();
  app.listen(port, () => {
    console.log(`app listening on: http://localhost:${port}`);
  });
}
startServer();
