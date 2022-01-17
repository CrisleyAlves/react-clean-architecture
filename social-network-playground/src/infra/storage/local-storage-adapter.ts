import { ClearStorage, GetStorage, SetStorage } from '@/data/protocols/http/storage'

export class LocalStorageAdapter implements SetStorage, GetStorage, ClearStorage {
  set (key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }

  clear (key: string): void {
    localStorage.removeItem(key)
  }
}
