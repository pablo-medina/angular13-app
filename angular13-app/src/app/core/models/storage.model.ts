export type StorageValueType = string | null;

export interface StorageService {
    get(key: string): StorageValueType
    set(key: string, value: StorageValueType): boolean
    remove(key: string): boolean
    clear(): boolean
}

export enum LocalStorageConfig {
    pwaSkip = 'pwa.skip'
}

