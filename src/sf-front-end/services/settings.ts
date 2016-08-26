import  * as store from "store";
import { WrapBus } from "mesh";
import { Settings } from "sf-front-end/models";
import { FrontEndApplication } from "sf-front-end/application";
import { BaseApplicationService } from "sf-core/services";
import { ApplicationServiceDependency } from "sf-core/dependencies";
import { InitializeAction, SettingChangeAction } from "sf-core/actions";

export class SettingsService extends BaseApplicationService<FrontEndApplication> {
  load(action: InitializeAction) {

    // TODO - this.app.config.settingsKey instead of hard-coded key here
    this.app.settings = new Settings(store.get("settings"));
    this.app.settings.observe(this.bus, WrapBus.create(this._onSettingsChange));
  }

  _onSettingsChange = (action: SettingChangeAction) => {
      store.set("settings", this.app.settings.data);
  }
}

export const dependency = new ApplicationServiceDependency("settings", SettingsService);
