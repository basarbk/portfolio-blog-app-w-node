import app from "./src/app.js";
import sequelize from "./src/db/index.js";

sequelize.sync({ force: true });

app.listen(8080, () => console.log("app is running on http://localhost:8080"));
