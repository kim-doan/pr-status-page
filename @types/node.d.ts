declare namespace NodeJS {
    export interface ProcessEnv {
      ENV: "local" | "dev" | "prod";
    }
  }
  