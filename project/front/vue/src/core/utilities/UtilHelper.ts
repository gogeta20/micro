interface RenameKeys {
  [key: string]: string;
}

/**
 * Fecha de referencia para cuando se quiere indicar una fecha vacia
 */
export const ReferenceDate = new Date(1900, 1, 1, 0, 0, 0, 0);

/**
 * Utilidades generales para instancias
 *
 * @export
 */
export class UtilHelper {
  /**
   * Devuelve si el valor está definido o no
   */
  public static isDefined<T>(value: T): boolean {
    return typeof value !== "undefined";
  }

  /**
   * Devuelve si el valor es un string
   */
  public static isString<T>(value: T): boolean {
    return typeof value === "string";
  }

  /**
   * Devuelve si el valor es un numero
   */
  public static isNumber<T>(value: T): boolean {
    return typeof value === "number";
  }

  /**
   * Devuelve si el valor es un numero entero positivo
   */
  public static isPositiveInteger<T>(value: T): boolean {
    const valueNumber = Number(value);
    const isInteger = Number.isInteger(valueNumber);
    const isPositive = valueNumber > 0;
    const isPositiveInteger = isInteger && isPositive;
    return isPositiveInteger;
  }

  /**
   * Devuelve si el valor es un string pero con valor vacio o nulo
   */
  public static isNullOrEmpty(data: string): boolean {
    return !(
      UtilHelper.isDefined(data) &&
      data !== null &&
      UtilHelper.isString(data) &&
      data.trim().length > 0
    );
  }

  /**
   * Devuelve si es un objecto sin propiedades
   */
  public static isObjectEmpty<T>(object: T): boolean {
    return object && Object.keys(object).length === 0;
  }

  /**
   * Devuelve si es un valor definido y no nulo
   */
  public static exist<T>(data: T): boolean {
    return UtilHelper.isDefined(data) && data !== null;
  }

  /**
   * Devuelve si el valor es un array, pudiendo indicar si tiene que tener datos o no
   */
  public static existArray<T>(data: T, withData = false): boolean {
    return (
      UtilHelper.isDefined(data) &&
      data !== null &&
      Array.isArray(data) &&
      (!withData || data.length > 0)
    );
  }

  /**
   * Devuelve si el valor es un string relleno
   */
  public static existString(data: string): boolean {
    return !UtilHelper.isNullOrEmpty(data);
  }

  /**
   * Devuelve si el valor es un valor numérico finito
   */
  public static isFinite(data: number): boolean {
    return UtilHelper.exist(data) && UtilHelper.isNumber(data) && Number.isFinite(data);
  }

  /**
   *  Promesa que se ejecuta después de un determinado tiempo en milisegundos
   */
  public static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Agrupa todos los elementos en un array de objetos `T` donde el valor de la propiedad `K` es el clave del objeto
   */
  public static groupByKey<T, K extends keyof T>(array: T[], key: K) {
    const map = new Map<T[K], T[]>();
    array.forEach((item) => {
      const itemKey = item[key];
      if (!map.has(itemKey)) {
        map.set(
          itemKey,
          array.filter((i) => i[key] === item[key])
        );
      }
    });
    return Object.fromEntries(map);
  }

  /**
   * Convierte una archivo a base64
   */
  static convertFileToBase64(file: File, withMetaData = false) {
    return new Promise<ItemFile>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (withMetaData) {
          resolve({
            base64: reader.result as string,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });
        } else {
          let encoded = reader.result?.toString().replace(/^data:(.*,)?/, "");
          if (encoded && encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve({
            base64: encoded as string,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   *
   */
  static convertBase64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = window.atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return blob;
  }

  /**
   * descarga un archivo
   */
  static onDownload(blob: Blob, title: string) {
    const link = document.createElement("a");
    document.body.appendChild(link);
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = title;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  /**
   * Devuelve Si estamos en el entorno marcado como desarrollo / producción
   * @param mode Desarrollo, producción o uno personalizado
   */
  static checkEnvironment(mode = "preview"): boolean {
    const envMode = import.meta.env.MODE;
    return envMode === "extranet" || envMode === mode;
  }

  /**
   * Devuelve texto en el idioma que el usuario ha seleccionado.
   */
  static changeLocale(language: string, textEs: string, textGl: string): string {
    return language === "es" ? textEs : textGl;
  }

  /**
   * Obtiene la ubicación del usuario
   */
  static async getLocation() {
    return new Promise<{ lat: number; long: number }>((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not available."));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({ lat: pos.coords.latitude, long: pos.coords.longitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  /**
   * Elimina los valores Falsy
   */
  static removeFalsyValues<T>(object: T) {
    return Object.fromEntries(Object.entries(object).filter(([, v]) => !!v));
  }

  /**
   * Toma un objeto y un mapa de claves para nuevas claves, y devuelve un nuevo objeto con las claves renombradas
   * manteniendo los valores iguales
   */
  static renameKeys(keysMap: RenameKeys, obj: RenameKeys) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );
  }

  static makeSort(keysMap: RenameKeys, obj: RenameKeys) {
    return Object.entries(UtilHelper.renameKeys(keysMap, obj)).join(",");
  }

  static deleteCookie(name: string) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  static createCookie(name: string, value: any, days = 1) {
    let expires = undefined;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  static clone(param: any) {
    return JSON.parse(JSON.stringify(param));
  }
}
