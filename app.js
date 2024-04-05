const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const chalk = require("chalk");
const setCookieSession = require("./middlewares/cookieSession");
const setCors = require("./middlewares/cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
var bodyParser = require('body-parser')


// routers paths --------------------------------
const createAcc = require("./routes/createAcc");
const login = require("./routes/login");
const verifyToken = require('./routes/verifyToken')
const userData = require('./routes/userData')
const updateUserData = require('./routes/updateUserData')
// --------


// Database connection function --------------------
connectToDB();
// --------

// Middlewares ----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCors);
app.use(bodyParser.json())
app.use("/verify-token", (next) => {
    next();
  }
);
// --------


// Routes ---------------------------
app.use("/api", createAcc);
app.use("/api", login);
app.use("/api", verifyToken);
app.use("/api", userData);
app.use("/api", updateUserData);
// --------






// Listner ---------------------------------------------

app.listen(PORT, () => {
  console.log("");
  console.log(chalk.bold.red(`~~~~ [ ${chalk.bold.green("API LIVE")} ] ~~~~`));
  console.log('');
  console.log(chalk.bold.red(`~~~~ [ ${chalk.bold.blue('Routes Stats')} ] ~~~~`))
  console.log('')
  const routes = {};
  const loadedRoutes = {};
  const promises = [];

  const routesDir = "./routes"; 
  fs.readdirSync(routesDir).forEach((file) => {
    if (file.endsWith(".js")) {
      var routeName = file.slice(0, -3);
      var routePath = `${routesDir}/${file}`;
      promises.push(
        new Promise((resolve, reject) => {
          try {
            const route = require(routePath);
            routes[routeName] = route;
            console.log(chalk.bold.blue(` - Loading route: ${routeName}`));
            console.log('')
            resolve();
          } catch (err) {
            console.error(
              chalk.bold.red(`Error loading route: ${routeName}`),
              err
            );
            reject();
          }
        })
      );
    }
  });

  Promise.all(promises)
    .then(() => {
      loadedRoutes.status = "successful";
      console.log(chalk.bold.green("✅ All routes loaded successfully!"));
    })
    .catch((err) => {
      loadedRoutes.status = "failed";
      console.error(chalk.bold.red("❌ Route loading failed:"), err);
    });
});
// --------

