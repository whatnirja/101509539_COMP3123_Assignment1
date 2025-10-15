const app = require('../server');
const connectDB = require('../src/config/db');

let ready = false;
async function ensureReady() {
  if (!ready) {
    await connectDB();
    ready = true;
  }
}

module.exports = async (req, res) => {
  await ensureReady();
  return app(req, res);
};
