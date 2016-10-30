import { inject } from "@tandem/common/decorators";
import { Action } from "@tandem/common/actions";
import { IActor } from "@tandem/common/actors";
import { IApplication } from "@tandem/common/application";
import {
  IInjectable,
  Dependencies,
  PrivateBusProvider,
  APPLICATION_SINGLETON_NS,
  DependenciesProvider,
} from "@tandem/common/ioc";

export interface ICommand extends IActor { }

export abstract class BaseCommand implements ICommand, IInjectable {

  @inject(PrivateBusProvider.ID)
  protected bus: IActor;

  @inject(DependenciesProvider.ID)
  protected dependencies: Dependencies;

  abstract execute(action: Action);
}
