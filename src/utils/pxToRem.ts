/**
 * Convert Pixels to REM (is better for responsiveness)
 * @param pixels - Pixels value to be converted
 * @returns The converted rem values
 */

export function pxToRem(pixels: number): string {
  return `${pixels / 16}rem`
}
