import { EmmaElementNode } from "../interface.js";
import NodeParser from "./node_parser.js";
import SingleTagParser from "./single_tag_parser.js";

class MultiplicationParser extends NodeParser {
    constructor(private emmet: EmmaElementNode) {
        super();
    }

    get containsNumberingPlaceholder(): boolean {
        return this.emmet.element.indexOf("$") > -1;
    }

    run(): string {
        let resultString = "";
        let element = this.emmet.element;
        let splitted = element.split("*");
        let emmetString = splitted[0];
        let multiplier = Number(splitted[1]);
        const parsedValue = new SingleTagParser({
            element: emmetString,
            child: undefined,
            type: "element",
            currentLevelSplit: emmetString,
        }).run();
        for(let i = 0; i < multiplier; i++){
            if(this.containsNumberingPlaceholder){
                resultString += parsedValue.replace(/\$/g, (i+1).toString());
            }else{
                resultString += parsedValue;
            }
            resultString += "\n";
        }
        return resultString;
    }
}

export default MultiplicationParser;