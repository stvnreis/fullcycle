FROM golang:1.21.1-alpine3.18 as builder

WORKDIR /app 

COPY . .

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /app

FROM scratch

COPY --from=builder /app/src/fullcycle .
CMD ["./fullcycle"]