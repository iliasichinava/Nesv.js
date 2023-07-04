import { ContainerInterface } from "../interfaces/container.interface.js";

export class Container implements ContainerInterface<any> {
  public constructor(
    private readonly _controllers: Map<string, any> = new Map<string, any>()
  ) {}

  public get controllers() {
    return this._controllers;
  }

  public register(key: string, value: any): void {
    this._controllers.set(key, value);
  }
  public resolve(key: string): any {
    const controller = this._controllers.get(key);

    if (!controller) throw new Error(`Controller ${key} does not exists`);

    return controller;
  }
}
