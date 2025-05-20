import process from "node:process"
import { api, logs, NodeSDK, tracing } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"
import { resourceFromAttributes } from "@opentelemetry/resources"
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
	SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from "@opentelemetry/semantic-conventions"
import { PrismaInstrumentation } from "@prisma/instrumentation"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"

const traceExporter = new OTLPTraceExporter({
	url: "http://localhost:4318/v1/traces",
})

const metricExporter = new OTLPMetricExporter({
	url: "http://localhost:4318/v1/metrics",
})

const sdk = new NodeSDK({
	traceExporter: traceExporter,
	metricReader: new PeriodicExportingMetricReader({
		exporter: metricExporter,
		exportIntervalMillis: 5000,
	}),
	instrumentations: [
		getNodeAutoInstrumentations(),
		new PrismaInstrumentation(),
		new HttpInstrumentation(),
		new ExpressInstrumentation(),
	],
	resource: resourceFromAttributes({
		[ATTR_SERVICE_NAME]: "darts-flow",
		[ATTR_SERVICE_VERSION]: "1.0",
		[SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: "dev",
	}),
})

sdk.start()
process.on("SIGTERM", () => {
	sdk
		.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0))
})
console.log("OpenTelemetry Metrics activé")

export { logger } from "./logger.js"
