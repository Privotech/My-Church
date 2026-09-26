import { defineConfig } from '@neon/config/v1';

export default defineConfig({
  buckets: {
    'church-media': { access: 'public_read' },
  },
});
