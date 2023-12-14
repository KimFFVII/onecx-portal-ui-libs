export class GetTooltipContentUtils {
  public static getTooltipContent(value: string, maxlength?: number): string | null {
    console.log('GET TOOLTIP CONTENT ', value)
    if (value) {
      const tooltipContent = value.toString()
      const truncatedLength = maxlength ?? 30
      return tooltipContent.length > truncatedLength ? tooltipContent : null
    } else {
      return null
    }
  }
}
