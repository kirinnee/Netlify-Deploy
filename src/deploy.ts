import {Execute} from "./classLibrary/Execute";
import {Core} from "@kirinnee/core";
import chalk from "chalk";

export async function Deploy(core: Core, dir: string, token: string, message: string, id?: string): Promise<{ reply: string, success: boolean }> {
	let exe: Execute = new Execute(core);
	let haveNetlify: boolean = await exe.run("netlify --help", {silent: true});
	if (!haveNetlify) return {reply: chalk.red("Netlify does not exist!"), success: false};
	
	let env: Map<string, string> = new Map([
		["NETLIFY_AUTH_TOKEN", token]
	]);
	
	if (id != null) env.set("NETLIFY_SITE_ID", id!);
	let deploy: boolean = await exe.run(`netlify deploy --prod --dir=${dir} --message "${message}"`, {
		env: env,
		silent: false
	});
	let reply = deploy ? chalk.greenBright("Deployment succeeded!") : chalk.red("Deployment failed.");
	return {reply: reply, success: deploy};
}