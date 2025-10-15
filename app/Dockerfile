FROM docker.io/alpine:3.21.2

# Add some dependencies.
RUN apk add --no-cache curl jq

# The entire application is defined as a shell script.
ADD oracle.sh /oracle.sh
ENTRYPOINT ["/oracle.sh"]
