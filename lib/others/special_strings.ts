class SpecialStrings {
  map : any = {
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
  constructor(public alias: string) {}

  get is(): boolean {
    return this.map[this.alias] !== undefined;
  }

  get() : string {
    return this.map[this.alias];
  }
}

export default SpecialStrings;