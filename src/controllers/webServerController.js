import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getHome = (req, res) => {
  const { messages } = req.session;
  let message;
  if (messages) {
    req.session.messages = [];
    message = messages[messages.length - 1];
  }
  res.render("./pages/home", {
    title: "Carga de productos y Chat",
    username: req.user?.username,
    successRegister: message
  });
};

export const getProductosMock = (req, res) => {
  res.sendFile("productos-mock.html", {
    root: path.join(__dirname, "..", "views")
  });
};

export const showAppInfo = (req, res) => {
  res.render("./pages/appInfo", {
    title: "App Info",
    SO: process.platform,
    nodeVersion: process.version,
    execPath: process.execPath,
    proyectPath: process.cwd(),
    args:
      process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno",
    pid: process.pid,
    rss: `${Math.round(process.memoryUsage().rss / 1024)} KB`
  });
};
