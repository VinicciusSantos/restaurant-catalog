import { GetStorage, SetStorage } from "../../domain/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  public get<T = unknown>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key)!);
  }

  public set<T = unknown>(key: string, value: T): void {
    value
      ? localStorage.setItem(key, JSON.stringify(value))
      : localStorage.removeItem(key);
  }
}
