import * as log from "https://deno.land/std@0.224.0/log/mod.ts";

log.setup({
	handlers: {
		console: new log.ConsoleHandler("DEBUG"),
		/*file: new log.FileHandler("WARN", {
			filename: "./log.txt",
			formatter: (record) =>
				`${record.datetime.toISOString()} [${record.levelName}] ${record.msg}`,
		}),*/
	},
	loggers: {
		default: {
			level: "DEBUG",
			handlers: ["console"],
			//handlers: ["console", "file"],
		},
	},
});

export const logger = log.getLogger();
