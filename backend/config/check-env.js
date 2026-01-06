// Check if required environment variables are set
require('dotenv').config();

const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease create a .env file with these variables.');
  console.error('You can copy .env.example and update the values.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');

