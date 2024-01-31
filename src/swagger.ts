import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	swaggerDefinition: {
		restapi: "3.0.0",
		info: {
			title: "Archivica",
			version: "1.0.0",
			description: "Archivica Backend",
			author: "Jebeni David",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["**/*.ts"],
};

const specs = swaggerJsdoc(options);

const documentation = (app: any) => {
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default documentation;
