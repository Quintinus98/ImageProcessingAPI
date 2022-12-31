import express from "express";
import routes from "./routes";

const app = express();
const port = 3000;

app.use("/api", routes);

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Connected");
});

app.listen(port, (): void => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
