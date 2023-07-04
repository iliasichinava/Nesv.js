import { ControllerInterface } from "../interfaces/controller.inteface";

export class AppContainer {
  private static instance: AppContainer;
  private static _controllers: Map<string, ControllerInterface> = new Map<
    string,
    ControllerInterface
  >();

  private constructor() {}

  public static get controllers() {
    return AppContainer._controllers;
  }

  public static getContainer(): AppContainer {
    if (!AppContainer.instance) {
      AppContainer.instance = new AppContainer();
    }

    return AppContainer.instance;
  }

  public static register(key: string, value: ControllerInterface): void {
    AppContainer._controllers.set(key, value);
  }

  public static resolve(key: string): ControllerInterface {
    const controller = AppContainer._controllers.get(key);

    if (!controller) {
      throw new Error(`Controller ${key} does not exist`);
    }

    return controller;
  }
}
