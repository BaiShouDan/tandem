import * as assert from "assert";
import * as path from "path";
import { SyntheticDOMElement, SyntheticWindow } from "@tandem/synthetic-browser";
import { IFileSystem, FileSystemProvider, ApplyFileEditRequest } from "@tandem/sandbox";
import { Injector, InjectorProvider, PrivateBusProvider, IBrokerBus, inject } from "@tandem/common";
import { IFileImporter, ImportFileRequest, PreviewLoaderProvider, OpenFileRequest } from "@tandem/editor/worker";

export interface IPreviewConfig {
  renderFunction: string;
  title: string;
  dependencyGraph: {
    strategy: string;
  }
}

// TODO - accept DND for preview files
export class TDRootFileImporter implements IFileImporter {

  @inject(InjectorProvider.ID)
  private _injector: Injector;

  @inject(FileSystemProvider.ID)
  private _fileSystem: IFileSystem;

  @inject(PrivateBusProvider.ID)
  private _bus: IBrokerBus;

  async importFile({ filePath, targetObject, options: { left, top } }: ImportFileRequest) {

    // TODO: temporary fix for DNDd files
    filePath = filePath.replace(/^file:\/\//g, "");

    const content = String(await this._fileSystem.readFile(filePath));

    const element = <SyntheticDOMElement>targetObject;

    if (content.indexOf("renderPreview") !== -1) {
      return this.importPreview(filePath, element, left, top);
    }

    const previewLoader = PreviewLoaderProvider.find(filePath, this._injector);

    if (!previewLoader) {
      throw new Error(`Cannot create preview file`);
    }

    const preview = await previewLoader.loadFilePreview(arguments[0]);

    if (!(await this._fileSystem.fileExists(preview.filePath))) {
      await this._fileSystem.writeFile(preview.filePath, preview.content);
      await this._bus.dispatch(new OpenFileRequest(preview.filePath));
    }

    return this.importPreview(preview.filePath, element, left, top);
  }

  private async importPreview(filePath: string, element: SyntheticDOMElement, left: number, top: number) {

    const { document } = new SyntheticWindow();
    const artboard = document.createElement("artboard");
    artboard.setAttribute("title", path.relative(process.cwd(), filePath));;
    artboard.setAttribute("src", filePath);
    artboard.setAttribute("style", `left:${left || 0}px;top:${top || 0}px;`);

    const edit = element.createEdit();
    edit.appendChild(artboard);

    this._bus.dispatch(new ApplyFileEditRequest(edit.actions, true));
  }

}