const app = require("./app");
const { sequelize } = require("./db/connection");

const PORT = 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
});