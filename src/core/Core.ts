/* eslint-disable class-methods-use-this */
import { Configuration } from "apiClients/prStatusApi";

import config from "../config";

export default class Core {
  public locale = "ko";

  public get apiConfig() {
    return new Configuration({
      apiKey: config.githubConfig.authorization,
    });
  }
}
