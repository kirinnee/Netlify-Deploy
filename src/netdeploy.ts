import {Core, Kore} from "@kirinnee/core"; 
import {Shape} from "./classLibrary/Shape";
import {Rectangle} from "./classLibrary/Rectangle";
import program from "commander"; 

let core:Core = new Kore();
core.ExtendPrimitives();

program
	.version("0.0.1")
	.description("Simple command line to deploy to netlify");

program.parse(process.argv);

let rect: Shape = new Rectangle(5,12);

let info:string = rect.area + " : " + rect.parameter();
console.log(info);

Program().then();

async function Program(){
	
	console.log("End of program~");
}