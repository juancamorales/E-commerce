const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;
const loadDb = require("./src/helpers/loadDb.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, async () => {
    await loadDb();
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
