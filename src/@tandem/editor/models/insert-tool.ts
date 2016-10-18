import { SyntheticDOMElement } from "@tandem/synthetic-browser";
import { BaseEditorTool, IEditorTool, IEditor } from "@tandem/editor/models";
import { MouseAction, SetToolAction, SelectAction } from "@tandem/editor/actions";
import {
  Action,
  IActor,
  inject,
  Service,
  startDrag,
  MainBusDependency,
  BoundingRect,
} from "@tandem/common";


export abstract class InsertTool extends BaseEditorTool {

  readonly cursor: string = "crosshair";
  readonly name: string =  "insert";
  public entityIsRoot: boolean = false;

  @inject(MainBusDependency.NS)
  readonly bus: IActor;

  readonly resizable: boolean = true;

  didInject() {

    // deselect all
    this.bus.execute(new SelectAction());
  }

  abstract createSyntheticDOMElement(): SyntheticDOMElement;
  abstract get displayEntityToolFactory(): { create(editor: IEditor): IEditorTool }
}