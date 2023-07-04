import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { AppContainer } from "./containers/app.container";
import { Container } from "./containers/container";

/**
 *
 * AppContainer {
 *  users/saba.ts {
 *    POST saba
 *  }
 *
 *  auth.ts {
 *    POST ping
 *  }
 * }
 *
 *
 *
 */

class Nesv {
  private app: express.Application;

  constructor(private readonly port: number = 3000) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public async start() {
    await this.registerControllers();
    await this.setupRoutes();
    this.app.listen(this.port, () => console.log("Server started at 3000"));
  }

  private traverseDirectory(currentPath: string): string[] {
    const filePaths: string[] = [];

    const entries = fs.readdirSync(currentPath);

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        const subdirectoryFilePaths = this.traverseDirectory(entryPath);
        filePaths.push(...subdirectoryFilePaths);
      } else {
        filePaths.push(entryPath);
      }
    }

    return filePaths;
  }

  private async registerControllers(directory: string = "./src/controllers") {
    const allFilePaths = this.traverseDirectory(directory);

    for (let controllerPath of allFilePaths) {
      const mod = await import(
        path.join(import.meta.url, "../../", controllerPath)
      );

      const controllerContainer = new Container();
      for (let k in mod) {
        controllerContainer.register(k, mod[k]);
      }

      controllerPath = controllerPath
        .split("\\")
        .slice(2, controllerPath.length - 2)
        .join("\\");

      AppContainer.register(controllerPath, controllerContainer); //!
    }
  }

  private async setupRoutes() {
    for (let [
      controllerName,
      controllerContainer,
    ] of AppContainer.controllers) {
      for (let [key, controller] of controllerContainer.controllers) {
        const splitted = controllerName.split(".");
        const endpoint_path = splitted.slice(0, splitted.length - 1);
        let p = `/${endpoint_path}/${key}`;
        p = p.replaceAll("\\", "/");
        console.log(p, controller);
        this.app.post(p, controller);
      }
    }
  }
}

const a = new Nesv(3000);

a.start();

export default Nesv;
