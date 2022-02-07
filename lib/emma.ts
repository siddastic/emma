import { EmmaElementNode } from "./others/interface.js";
import SpecialStrings from "./others/special_strings.js";
import MultiplicationParser from "./parser/multiplication_parser.js";
import NodeParser from "./parser/node_parser.js";
import SingleTagParser from "./parser/single_tag_parser.js";
import StringToNode from "./transpiler/string_to_node.js";

class Emma {
    constructor(private emmet: string) {
    }

    // public parse() : BaseEmmaNode{}
    // public parse(){
    //     var arr = this.splitTree();
    //     arr.forEach(leaf=>{
    //         if(this.containsMultiplier(leaf)){
    //             var splitted = leaf.split("*");
    //             // var node = new MultiplierEmmaNode(splitted[0], splitted[1]);
    //             var elementToMultiply = splitted[0];
    //             var multiplier = parseInt(splitted[1]);

    //             for(var i = 0; i < multiplier; i++){
    //                 console.log(`<${elementToMultiply}></${elementToMultiply}>`);
    //             }
    //         }
    //     });
    // }


    public open() : string{
        const specialStrings = new SpecialStrings(this.emmet);
        if(specialStrings.is){
            return specialStrings.get();
        }
        var arr = this.splitTree();
        let rootNode: EmmaElementNode | null | undefined;
        arr.forEach((leaf, index) => {
            if (index == 0) {
                // parsing root node
                const output = new StringToNode(leaf).parse<EmmaElementNode>();
                rootNode = output;
            } else {
                const output = new StringToNode(leaf).parse<EmmaElementNode>();
                rootNode!.child = output;
            }
        });
        let parser : NodeParser;
        if(this.emmet.indexOf("*") > -1){
            parser = new MultiplicationParser(rootNode!);
        }
        else{
            parser = new SingleTagParser(rootNode!);
        }
        console.log(parser.run());

        return parser.run();
        // console.log(JSON.stringify(rootNode, null, 2));
    }

    public splitTree(): Array<string> {
        return this.emmet.split(">");
    }

    public get htmlElement() : HTMLElement {
        const root = document.createElement("div");
        root.innerHTML = this.open();
        return root;
    }
}

// const parser = new Emma("ul>li*6");
// parser.open();

new Emma("#withId${Hii}*10").open();
new Emma(".with$Class*5").open();
new Emma("span#withId").open();
new Emma("h$.withClass${Heading $}*6").open();
new Emma("div{Hii}*5").open();
console.log(new Emma("br").open());

console.log(new Emma("ul+div+.withClass+#withId").open());

document.body.innerHTML += `<div>${new Emma("h${Heading $}* 6").open()}</div>`;
// document.body.innerHTML += `${new Emma("li#withId${Hii this is line $}*100").open()}`;
document.body.appendChild(new Emma("li#withId${Hii this is line $}*5").htmlElement);

console.log(new Emma("ul>li*5"));