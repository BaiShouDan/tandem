import { Logger } from "saffron-core/src/logger/index";
import { loggable, bindable } from "saffron-core/src/decorators";
import { LoadAction, InitializeAction } from "saffron-core/src/actions";

import { Mediator, IInvoker, IActor } from "saffron-base/src/actors";
import { IApplication } from "saffron-base/src/application";
import { FragmentDictionary } from "saffron-base/src/fragments";

import { ParallelBus, Bus, Response } from "mesh";
// import { ApplicationServiceFragment } from "../fragments/index";
// import { fragment as consoleLogFragment } from "../services/console-output";

// @observable
@loggable()
export class Application implements IApplication, IInvoker {

  readonly logger: Logger;
  readonly bus: IActor = new Mediator();
  readonly fragments: FragmentDictionary = new FragmentDictionary();
  private _initialized: boolean;

  @bindable()
  public loading: boolean;

  constructor(readonly config: any = {}) {
    this._registerFragments();
  }

  public async initialize() {

    if (this._initialized) {
      throw new Error("Cannot initialize application twice.");
    }

    this._initialized = true;
    this._initializeActors();

    this.willInitialize();
    await this.bus.execute(new LoadAction());
    await this.bus.execute(new InitializeAction());
    this.didInitialize();
  }

  /**
   */

  protected _registerFragments() {
    if (!process.env.TESTING) {
      // this.fragments.register(consoleLogFragment);
    }
  }

  /**
   */

  private _initializeActors() {
    /*
    queryAllApplicationServiceFragments(this.fragments)
    */
    // this.actors.push(...this.fragments.queryAll<ApplicationServiceFragment>("application/services/**").map((fragment: ApplicationServiceFragment) => (
    //   fragment.create(this)
    // )));
  }

  /**
   */

  protected willInitialize() {
    // OVERRIDE ME
  }

  /**
   */

  protected didInitialize() {
    this.logger.info("initialized");
  }
}
