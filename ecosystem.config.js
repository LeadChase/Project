module.exports = {
  apps: [{
    name: 'leadchoose-waitlist',
    script: 'dist/server.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      PROD_PORT: 5001
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}; 