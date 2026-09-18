# Local observability stack

Start the production-like services together with the optional observability
profile:

```bash
docker compose --profile observability up -d
```

Enable OTLP tracing for the API through environment variables:

```text
OTEL_ENABLED=true
OTEL_SERVICE_NAME=linze-blog-api
OTEL_EXPORTER_OTLP_ENDPOINT=jaeger:4317
OTEL_EXPORTER_OTLP_INSECURE=true
OTEL_TRACES_SAMPLER_ARG=1.0
```

The local endpoints are:

- Grafana: http://localhost:3001 (user: `admin` / password: `admin`)
- Prometheus: http://localhost:9090
- Jaeger UI: http://localhost:16686
- Jaeger OTLP gRPC: localhost:4317

Grafana is pre-provisioned with Prometheus and Jaeger datasources, and includes an auto-loaded "Blog API Observability Overview" dashboard.

The API metrics endpoint is scraped over the private Compose network at
`http://backend:8085/metrics` and is not routed by the public Caddy config.
