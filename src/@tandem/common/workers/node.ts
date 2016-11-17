import { isMaster, Worker, fork as clusterFork } from "cluster";
import { IDispatcher, RemoteBus, FilterBus, ProxyBus, filterFamilyMessage } from "@tandem/mesh";
import { serialize, deserialize } from "@tandem/common";

export { isMaster };

export const fork = (family: string, localBus: IDispatcher<any, any>) => {

  const remoteBus = new ProxyBus();

  const spawn = () => {
    const worker = clusterFork(process.env);
    remoteBus.target = createProcessBus(family, worker, localBus);

    worker.on("disconnect", () => {
      remoteBus.target = undefined;

      // add timeout in case the worker is crashing repeatedly
      setTimeout(spawn, 1000);
    });
  };

  spawn();

  return remoteBus;
}

const createProcessBus = (family: string, proc: Worker | NodeJS.Process, target: IDispatcher<any, any>) => {
  return new RemoteBus({
    family,
    testMessage: filterFamilyMessage,
    adapter: {
      send(message) {
        proc.send(message);
      },
      addListener(message) {
        proc.on("message", message);
      }
    }
  }, target, { serialize, deserialize });
}

export const hook = (family: string, localBus: IDispatcher<any, any>) => {
  return createProcessBus(family, process, localBus);
}
