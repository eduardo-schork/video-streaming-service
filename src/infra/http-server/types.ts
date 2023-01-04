import { Express } from "express";

export interface HttpServerAdapter {
  run: () => void;
}
