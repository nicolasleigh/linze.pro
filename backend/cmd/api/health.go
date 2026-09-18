package main

import (
	"net/http"
)

func (app *application) healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"status":  "ok",
		"env":     app.config.env,
		"version": version,
	}
	if err := app.jsonResponse(w, http.StatusOK, data); err != nil {
		app.internalServerError(w, r, err)
	}
}

// readinessCheckHandler 表示实例是否仍然可以接收新流量。
// health 用于存活检查；Shutdown 开始后 readiness 返回 503，
// 供反向代理或编排系统执行摘流。
func (app *application) readinessCheckHandler(w http.ResponseWriter, r *http.Request) {
	if !app.ready.Load() {
		data := map[string]string{
			"status":  "draining",
			"env":     app.config.env,
			"version": version,
		}
		if err := app.jsonResponse(w, http.StatusServiceUnavailable, data); err != nil {
			app.internalServerError(w, r, err)
		}
		return
	}

	data := map[string]string{
		"status":  "ready",
		"env":     app.config.env,
		"version": version,
	}
	if err := app.jsonResponse(w, http.StatusOK, data); err != nil {
		app.internalServerError(w, r, err)
	}
}
