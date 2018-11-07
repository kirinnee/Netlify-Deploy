import {spawn} from "child_process";
import {Core} from "@kirinnee/core";
import * as path from "path";

class Execute {
	
	constructor(core: Core) {
		if (!core.IsExtended) throw new Error("Core needs to be extended!");
	}
	
	Overwrite(from: any, to: any): object {
		for (let k in from) {
			if (from.hasOwnProperty(k)) {
				if (typeof to[k] === "object") {
					to[k] = this.Overwrite(from[k], to[k]);
				} else {
					to[k] = from[k];
				}
			}
		}
		return to;
	}
	
	parseOption(opts: RunOptions): Options {
		opts.env = opts.env || new Map();
		return {
			env: this.Overwrite(opts.env.AsObject(), process.env) as NodeJS.ProcessEnv,
			silent: opts.silent || false,
			dir: path.resolve(process.cwd(), opts.dir || "")
		}
	}
	
	run(cmd: string, opts?: RunOptions): Promise<boolean> {
		let command: string[] = cmd.split(' ');
		let c: string = command.shift()!;
		let v = command;
		
		opts = opts || {};
		
		let options: Options = this.parseOption(opts);
		
		return new Promise((resolve) => spawn(c, v,
			{
				stdio: options.silent ? "ignore" : "inherit",
				shell: true,
				env: options.env,
				cwd: options.dir
			})
			.on("exit", (code: number) => {
				resolve(code === 0);
			})
		);
	}
}

interface RunOptions {
	env?: Map<string, string>;
	silent?: boolean;
	dir?: string;
}

interface Options {
	env: NodeJS.ProcessEnv;
	silent: boolean;
	dir: string;
}

export {Execute, RunOptions};