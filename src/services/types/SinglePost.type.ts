import { type Item } from "../../../server/src/types";

export type SingleItemGetOut = {
  items: (Item & {
    needsRevision: boolean;
  })[];
  total: number;
}