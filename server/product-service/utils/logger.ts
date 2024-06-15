import * as log from "https://deno.land/std@0.224.0/log/mod.ts";

// custom configuration with 2 loggers (the default and `tasks` loggers).
log.setup({
  handlers: {
    console: new log.ConsoleHandler("DEBUG"),

    file: new log.FileHandler("WARN", {
      filename: "./product-service.log",
      // you can change format of output message using any keys in `LogRecord`.
      //formatter: (record) => `${record.levelName} ${record.msg}`,
    }),
  },

  loggers: {
    // configure default logger available via short-hand methods above.
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});

let logger = log.getLogger();

// Teste de logging
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warn message");
logger.error("Error message");

export { logger }