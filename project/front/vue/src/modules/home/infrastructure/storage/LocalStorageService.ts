// Servicio de almacenamiento local
export class LocalStorageService {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
