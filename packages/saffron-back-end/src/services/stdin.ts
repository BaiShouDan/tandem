import * as chalk from 'chalk';
import Logger from 'saffron-common/lib/logger/index'; 
import document from 'saffron-common/lib/actors/decorators/document';
import loggable from 'saffron-common/lib/decorators/loggable';
import IApplication from 'saffron-common/lib/application/interface';
import * as readline from 'readline';
import BaseApplicationService from 'saffron-common/lib/services/base-application-service';
import { ClassFactoryFragment } from 'saffron-common/lib/fragments/index';

/**
 * console input command handler
 */

@loggable
export default class StdinService extends BaseApplicationService<IApplication> {

  public logger:Logger;
  private _rl:readline.ReadLine;

  initialize() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._readInput();
    this.logger.prefix = '';
  }

  /**
   * returns the available command-line actions
   */

  @document('shows help menu')
  help() {

    this.app.actors.forEach((actor) => {
      var docs = (actor as any).__documentation || {};

      for (const actionType in docs) {
        this.logger.info('{ type: %s }: %s', chalk.bold(actionType), docs[actionType]);
      }
    });
  }

  _readInput = () => {
    this._rl.question('> ', this._onInput);
  }

  _onInput = async (text) => {

    var action;

    try {
      action = (new Function(`return ${text};`))();
    } catch (e) {
      action = { type: text };
    }

    try {
      var response = this.bus.execute(action);
      var value;
      var done;
      while ({ value, done } = await response.read()) {
        if (done) break;
        this.logger.info(value);
      }
    } catch (e) {
      this.logger.error(e.message);
    }
    this._readInput();
  }
}

export const fragment = new ClassFactoryFragment('application/services/stdin', StdinService);