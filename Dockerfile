FROM golang:alpine as go

WORKDIR /go-app
COPY go .
RUN go build

FROM node as node
WORKDIR /node-app
RUN mkdir web
COPY web web/
COPY Makefile .
RUN make frontend_prod

FROM alpine as main
RUN mkdir -p web/dist
COPY --from=go /go-app/go-chat .
COPY --from=node /node-app/web/dist web/dist

CMD ["./go-chat"]
EXPOSE 8000
