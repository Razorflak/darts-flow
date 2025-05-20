import { logs } from "@opentelemetry/api-logs"
import {
	LoggerProvider,
	SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs"
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http"
import { OpenTelemetryTransportV3 } from "@opentelemetry/winston-transport"
import { resourceFromAttributes } from "@opentelemetry/resources"
import winston from "winston"

const otlpExporter = new OTLPLogExporter({
	url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
})

const loggerProvider = new LoggerProvider({
	resource: resourceFromAttributes({
		"service.name": "darts-flow",
		"service.version": "1.0.0",
		"deployment.environment": process.env.NODE_ENV || "development",
	}),
})

loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(otlpExporter))
logs.setGlobalLoggerProvider(loggerProvider)

const winstonLogger = winston.createLogger({
	level: "debug",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.errors({ stack: true }),
		//winston.format.metadata(), // Bloque le fait d'ajouter des attributs personnaliser pout SignOz
		winston.format.json(),
		// winston.format.colorize(), // Fait bugger les logs sur SignOz
		winston.format.align(),
	),
	defaultMeta: {
		service: "winston-logger",
		environment: process.env.NODE_ENV || "development",
	},
	transports: [
		new OpenTelemetryTransportV3({
			// @ts-expect-error
			loggerProvider,
			logAttributes: {
				"service.name": "winston-logger",
				"deployment.environment": process.env.NODE_ENV || "development",
			},
		}),
		new winston.transports.Console({
			level: "debug",
			format: winston.format.simple(),
		}),
	],
})

export const logger = {
	info: (
		text: string,
		body?: Record<string, unknown>,
		attribute?: Record<string, unknown>,
	) => {
		winstonLogger.info(JSON.stringify(body), { text, ...attribute })
	},
	warn: (
		text: string,
		body?: Record<string, unknown>,
		attribute?: Record<string, unknown>,
	) => {
		winstonLogger.warn(JSON.stringify(body), { text, ...attribute })
	},
	error: (text: string, body?: Error, attribute?: Record<string, unknown>) => {
		winstonLogger.error(JSON.stringify(body), { text, ...attribute })
	},
	debug: (
		text: string,
		body?: Record<string, unknown>,
		attribute?: Record<string, unknown>,
	) => {
		winstonLogger.debug(JSON.stringify(body), { text, ...attribute })
	},
}
