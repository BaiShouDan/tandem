import { 
  transpilePaperclipToStringRenderer
} from "../../paperclip2";
import { expect } from "chai";

describe(__filename + "#", () => {
  xit("can transpile a text node", () => {
    const newSource = transpilePaperclipToStringRenderer(`
      <template name="test">
        <span style={{'color:' + color}}>
          {{name}}
        </span>
      </template>
    `);
  });
});