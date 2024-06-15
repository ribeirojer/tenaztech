FROM denoland/deno:1.44.2

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY . .

CMD ["run", "--allow-net", "server.ts"]