export interface GetStorage {
  get<T = unknown>(key: string): T | null;
}

export interface SetStorage {
  set<T = unknown>(key: string, value: T): void;
}
