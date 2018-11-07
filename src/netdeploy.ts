import {Core, Kore} from "@kirinnee/core";
import program from "commander";
import chalk from "chalk";
import {Deploy} from "./deploy";


let core: Core = new Kore();
core.ExtendPrimitives();

program
	.version("0.0.2")
	.description("Simple command line to deploy to netlify");

program
	.option("-D, --dir <dir>", "Directory")
	.option("-T, --token <token>", "Auth Token")
	.option("-I, --id <id>", "Site ID")
	.option("-M, --message <message>", 'Message to send over');

program.parse(process.argv);

let dir: string = program.dir || ".";
let token: string = program.token || null;
let id: string | undefined = program.id || undefined;
let map: string = program.message || "";

if (token == null) {
	console.log(chalk.red("Error: There's no token!"));
	process.exit(1);
}

console.log(dir, token, id, map);

Deploy(core, dir, token, map, id).then(s => {
	console.log(s.reply);
	process.exit(s.success ? 0 : 1)
});



