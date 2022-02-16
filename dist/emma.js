'use strict';

class SpecialStrings {
    constructor(alias) {
        this.alias = alias;
        this.map = {
            "!": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>
<body>
    
</body>
</html>`,
            br: `<br/>`,
        };
    }
    get is() {
        return this.map[this.alias] !== undefined;
    }
    get() {
        return this.map[this.alias];
    }
}

class NodeParser {
}

class SingleTagParser extends NodeParser {
    constructor(emmet) {
        super();
        this.emmet = emmet;
    }
    get startsWithClass() {
        return this.emmet.element.startsWith(".");
    }
    get startsWithId() {
        return this.emmet.element.startsWith("#");
    }
    get containsClassInMiddle() {
        return this.emmet.element.indexOf(".") > -1;
    }
    get containsIdInMiddle() {
        return this.emmet.element.indexOf("#") > -1;
    }
    get containsText() {
        return (this.emmet.element.indexOf("{") > -1 &&
            this.emmet.element.indexOf("}") > -1 &&
            this.emmet.element.indexOf("}") > this.emmet.element.indexOf("{"));
    }
    get haveSiblings() {
        return this.emmet.element.indexOf("+") > -1;
    }
    renderSiblings() {
        var siblings = this.emmet.element.split("+");
        var resString = "";
        siblings.forEach(sibling => {
            this.emmet.element = sibling;
            resString += this.run() + "\n";
        });
        return resString;
    }
    run() {
        var element = this.emmet.element;
        var specialStrings = new SpecialStrings(element);
        if (specialStrings.is)
            return specialStrings.get();
        if (this.haveSiblings) {
            return this.renderSiblings();
        }
        var text = "";
        if (this.containsText) {
            text = element.substring(element.indexOf("{") + 1, element.indexOf("}"));
            element = element.split("{")[0] + element.split("}")[1];
        }
        if (this.startsWithClass) {
            return `<div class = "${element.substring(1)}">${text}</div>`;
        }
        else if (this.startsWithId) {
            return `<div id = "${element.substring(1)}">${text}</div>`;
        }
        else if (this.containsClassInMiddle) {
            return `<${element.split(".")[0]} class = "${element.split(".")[1]}">${text}</${element.split(".")[0]}>`;
        }
        else if (this.containsIdInMiddle) {
            return `<${element.split("#")[0]} id = "${element.split("#")[1]}">${text}</${element.split("#")[0]}>`;
        }
        else {
            return `<${element}>${text}</${element}>`;
        }
    }
}

class MultiplicationParser extends NodeParser {
    constructor(emmet) {
        super();
        this.emmet = emmet;
    }
    get containsNumberingPlaceholder() {
        return this.emmet.element.indexOf("$") > -1;
    }
    run() {
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
        for (let i = 0; i < multiplier; i++) {
            if (this.containsNumberingPlaceholder) {
                resultString += parsedValue.replace(/\$/g, (i + 1).toString());
            }
            else {
                resultString += parsedValue;
            }
            resultString += "\n";
        }
        return resultString;
    }
}

var EmmetOperations;
(function (EmmetOperations) {
    EmmetOperations[EmmetOperations["Multiply"] = 0] = "Multiply";
})(EmmetOperations || (EmmetOperations = {}));

class StringToNode {
    constructor(str) {
        this.str = str;
    }
    parse() {
        return this.parseAsElementNode();
    }
    get containsMultiplier() {
        return this.str.indexOf("*") > -1;
    }
    parseAsElementNode() {
        return {
            type: 'element',
            currentLevelSplit: this.str,
            element: this.str,
            operations: this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    }
}

class Emma {
    constructor(emmet) {
        this.emmet = emmet;
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
    open() {
        const specialStrings = new SpecialStrings(this.emmet);
        if (specialStrings.is) {
            return specialStrings.get();
        }
        var arr = this.splitTree();
        let rootNode;
        arr.forEach((leaf, index) => {
            if (index == 0) {
                // parsing root node
                const output = new StringToNode(leaf).parse();
                rootNode = output;
            }
            else {
                const output = new StringToNode(leaf).parse();
                rootNode.child = output;
            }
        });
        let parser;
        if (this.emmet.indexOf("*") > -1) {
            parser = new MultiplicationParser(rootNode);
        }
        else {
            parser = new SingleTagParser(rootNode);
        }
        console.log(parser.run());
        return parser.run();
        // console.log(JSON.stringify(rootNode, null, 2));
    }
    splitTree() {
        return this.emmet.split(">");
    }
    get htmlElement() {
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
