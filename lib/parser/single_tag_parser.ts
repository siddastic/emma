import { EmmaElementNode, EmmaRootNode } from "../interface.js";
import NodeParser from "./node_parser.js";

class SingleTagParser extends NodeParser {
  constructor(private emmet: EmmaElementNode | EmmaRootNode) {
    super();
  }
  get startsWithClass(): boolean {
    return this.emmet.element.startsWith(".");
  }
  get startsWithId(): boolean {
    return this.emmet.element.startsWith("#");
  }
  get containsClassInMiddle(): boolean {
    return this.emmet.element.indexOf(".") > -1;
  }
  get containsIdInMiddle(): boolean {
    return this.emmet.element.indexOf("#") > -1;
  }

  get containsText(): boolean {
    return (
      this.emmet.element.indexOf("{") > -1 &&
      this.emmet.element.indexOf("}") > -1 &&
      this.emmet.element.indexOf("}") > this.emmet.element.indexOf("{")
    );
  }
  run(): string {
    var element = this.emmet.element;
    var text : string = '';
    if(this.containsText){
        text = element.substring(element.indexOf("{")+1, element.indexOf("}"));
        element = element.split("{")[0] + element.split("}")[1];
    }
    if (this.startsWithClass) {
      return `<div class = "${element.substring(1)}">${text}</div>`;
    } else if (this.startsWithId) {
      return `<div id = "${element.substring(1)}">${text}</div>`;
    } else if (this.containsClassInMiddle) {
      return `<${element.split(".")[0]} class = "${element.split(".")[1]}">${text}</${
        element.split(".")[0]
      }>`;
    } else if (this.containsIdInMiddle) {
      return `<${element.split("#")[0]} id = "${element.split("#")[1]}">${text}</${
        element.split("#")[0]
      }>`;
    } else {
      return `<${element}>${text}</${element}>`;
    }
  }
}

export default SingleTagParser;
