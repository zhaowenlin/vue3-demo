/**
 * @description: Development model
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return process.env.NODE_ENV || 'development'
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV === devMode
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return process.env.NODE_ENV === prodMode
}

export function getStorageShortName(version?: string) {
  return `${'demo-app'}${`__${version}`}__`.toUpperCase()
}
