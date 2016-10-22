import { KeyBinding } from "@tandem/editor/key-bindings";
import { ParallelBus } from "mesh";
import { IEditor, IEditorTool } from "./base";

import {
  IActor,
  Action,
  inject,
  Metadata ,
  IInjectable,
  IPoint,
  Transform
} from "@tandem/common";

import { ISynthetic } from "@tandem/sandbox";
import { ISyntheticBrowser, SyntheticBrowser, BaseDOMNodeEntity } from "@tandem/synthetic-browser";

export const MIN_ZOOM = 0.02;
export const MAX_ZOOM = 6400 / 100;

// TODO - change to Workspace
export class Editor implements IEditor {

  readonly metadata = new Metadata(this);

  private _zoom: number = 1;
  public translate: IPoint = { left: 0, top: 0 };
  private _currentTool: IEditorTool;
  public transform: Transform = new Transform();
  public selection: ISynthetic[] = [];
  public browser: ISyntheticBrowser;

  // TODO - this may change dependening on the editor type
  readonly type = "display";
  public cursor = null;

  constructor() {}

  get document() {
    return this.browser && this.browser.document;
  }

  get visibleEntities() {

    // TODO
    return null;
  }

  get zoom() { return this.transform.scale; }
  set zoom(value: number) {
    this.transform.scale = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, value)
    );
  }

  get currentTool(): IEditorTool {
    return this._currentTool;
  }

  set currentTool(value: IEditorTool) {
    if (this._currentTool) {
      this._currentTool.dispose();
    }
    this._currentTool = value;
    if (!value) return;
    this.cursor = value.cursor;
  }

  execute(action: Action) {
    if (this.currentTool) {
      this.currentTool.execute(action);
    }
  }
}