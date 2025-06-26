import { signal } from "@angular/core";

export interface BlockState {
  isMaximized: boolean;
  loading: ReturnType<typeof signal>;
}