FROM avcosystems/golang-node

WORKDIR /app
COPY . .
RUN go build

RUN make

CMD ["./go-chat"]

EXPOSE 8080

