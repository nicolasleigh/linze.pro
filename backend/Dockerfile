FROM golang:1.23.8-alpine3.20
WORKDIR /usr/src/app
COPY go.mod go.sum ./
RUN go env -w GOPROXY=https://goproxy.cn,https://mirrors.aliyun.com/goproxy/,direct
RUN go mod download
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.18.2
RUN find /go/bin -type f -name migrate -exec cp {} /usr/local/bin/migrate \;
COPY . .
RUN go build -o /usr/local/bin/app ./cmd/api
EXPOSE 8085
CMD ["app"]