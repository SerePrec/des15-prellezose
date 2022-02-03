import { fork } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getRandoms = (req, res) => {
  const { cant = 1e8 } = req.query;
  if (Number(cant)) {
    const child = fork(
      path.join(__dirname, "..", "childProcesses", "calcRandomNumbers.js")
    );

    child.on("message", msg => {
      //handshake
      if (msg === "ready")
        child.send({
          action: "start",
          payload: { min: 1, max: 1000, qty: Number(cant) }
        });
      else res.json(msg);
    });
    child.on("error", error => {
      console.log(
        `Error en Child process 'calcRandomNumbers' con pid:${child.pid}:\n${error}`
      );
      res.status(500).send({ error: "error interno del servidor" });
    });
    child.on("close", code => {
      console.log(
        `Child process 'calcRandomNumbers' con pid:${child.pid} terminado con código ${code}`
      );
      if (code !== 0)
        res.status(500).send({ error: "error interno del servidor" });
    });
  } else res.json({ error: "valor de parámetro inválido" });
};
