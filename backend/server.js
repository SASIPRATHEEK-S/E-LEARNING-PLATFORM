require('dotenv').config({ path: './env/.env' });
const app = require('./app');
const config = require('./config/dbConfig');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});