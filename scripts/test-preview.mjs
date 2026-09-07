import { preview } from 'astro';

// Keep the test server attached to Playwright, including inside agent sessions.
const server = await preview({ server: { host: '127.0.0.1', port: 4323 } });
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    await server.stop();
    process.exit(0);
  });
}
