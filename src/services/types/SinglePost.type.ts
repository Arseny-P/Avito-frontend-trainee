import { type Item } from "@/server/src/types";

export type SingleItemGetOut = Item & {
  needsRevision: boolean;
};
