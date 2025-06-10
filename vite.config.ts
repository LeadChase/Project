import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Vite config - Environment variables loaded:', {
    hasVapiKey: !!env.VITE_VAPI_KEY,
    hasAssistantId: !!env.VITE_VAPI_ASSISTANT_ID,
    mode
  });

  return {
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
    define: {
      'process.env': env
    },
    server: {
      port: 3000,
      proxy: {
        '/api': 'http://localhost:5001',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['lucide-react']
          }
        }
      }
    }
  };
});
