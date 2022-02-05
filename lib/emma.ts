import { EmmaElementNode, EmmaRootNode } from "./interface.js";
import SingleTagParser from "./parser/single_tag_parser.js";
import StringToNode from "./transpiler/string_to_node.js";

class Emma {
    constructor(private emmet: string) { }

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


    public open() {
        var arr = this.splitTree();
        let rootNode: EmmaRootNode | null | undefined;
        arr.forEach((leaf, index) => {
            if (index == 0) {
                // parsing root node
                const output = new StringToNode(leaf).parse<EmmaRootNode>(true);
                rootNode = output;
            } else {
                const output = new StringToNode(leaf).parse<EmmaElementNode>();
                rootNode!.child = output;
            }
        });
        var singleTagParser = new SingleTagParser(rootNode!);
        console.log(singleTagParser.run());
        console.log(JSON.stringify(rootNode, null, 2));
    }

    public containsMultiplier(emmet: string): Boolean {
        return emmet.indexOf("*") > -1;
    }

    public splitTree(): Array<string> {
        return this.emmet.split(">");
    }
}

// const parser = new Emma("ul>li*6");
// parser.open();

new Emma("#withId").open();
new Emma(".withClass").open();
new Emma("span#withId").open();
new Emma("h1.withClass").open();
new Emma("div").open();