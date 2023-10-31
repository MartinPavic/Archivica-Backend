import pino from "pino";

const logger = pino({ name: "Archivica", level: "debug", transport: { target: "pino-pretty" } });

export default logger;
