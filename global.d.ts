import { TOKEN_DATA } from "@modules/user/types";

declare global {
  namespace Express {
    interface Request {
      auth?: TOKEN_DATA;
    }

    interface Response {
      message?: string;
    }
  }
}

export interface REQ_GETS_QUERIES {
  limit?: number | string;
  offset?: number | string;
}
