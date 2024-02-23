import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yamljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerJsDocs = YAML.load(path.resolve(__dirname, "../docs.yml"));

const documentation = (app: any) => {
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
};

export default documentation;
