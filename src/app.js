import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { passport } from "./middlewares/passport.js";
import config from "./config.js";
import authRouter from "./routes/authRouter.js";
import webServerRouter from "./routes/webServerRouter.js";
import apiTestsRouter from "./routes/apiTestsRouter.js";
import apiProductosRouter from "./routes/apiProductosRouter.js";
import apiRandomsRouter from "./routes/apiRandomsRouter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mongoUrl =
  process.env.PERS === "mongodb"
    ? config.mongoDb.connectionString
    : config.mongoDbAtlas.connectionString;
const mongoOptions =
  process.env.PERS === "mongodb"
    ? config.mongoDb.advancedOptions
    : config.mongoDbAtlas.advancedOptions;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nginx configurado como servidor de recursos estáticos. Para optimizar rendimiento
//app.use(express.static(path.join(__dirname, "public")));

// ELECCIÓN DE SESSION STORE: MONGOSTORE ****************
app.use(
  session({
    store: MongoStore.create({ mongoUrl, mongoOptions }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 10 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(webServerRouter);
app.use("/api", apiTestsRouter);
app.use("/api/randoms", apiRandomsRouter);
app.use("/api/productos", apiProductosRouter);

// error 404 API
app.use("/api", (req, res, next) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.baseUrl + req.path}' método '${
      req.method
    }' no implementada`
  });
});

// error 404 WEB
app.use((req, res, next) => {
  res.sendFile("404.html", {
    root: path.join(__dirname, "views")
  });
});

export default app;
