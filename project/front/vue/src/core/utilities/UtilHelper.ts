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
}
