import "./index.scss";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";

// https://codemirror.net/demo/theme.html#dracula
// import "codemirror/theme/cobalt.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/material.css";

const CodeMirror = require("codemirror");
import React     = require("react");

export interface ICodeMirrorComponentProps {
  onChange(value: string): any;
  value?: string;
  contentType?: string;
}

export class CodeMirrorComponent extends React.Component<ICodeMirrorComponentProps, any> {

  private _instance: CodeMirror.Editor;

  componentDidMount() {
    this._instance = CodeMirror.fromTextArea((this.refs as any).textarea, {
      theme: "dracula",
      smartIndent: true,
      value: this.props.value
    });

    this._instance.on("change", () => {
      this.props.onChange(this._instance.getValue());
    })
  } 

  componentWillReceiveProps(props: ICodeMirrorComponentProps) {

    if (this.props.value !== props.value) {
      this._instance.setValue(props.value);
    }

    if (this.props.contentType !== props.contentType) {
      const type = (props.contentType || "").split("/")[1];

      const alias = {
        html: "htmlmixed"
      }[type] || type;

      this._instance.setOption("mode", { name: alias });
    }

  }

  render() {
    return <div className="codemirror-component">
      <textarea ref="textarea" defaultValue={this.props.value} autoComplete="off" />
    </div>;
  }
}