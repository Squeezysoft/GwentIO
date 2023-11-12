export abstract class MathHelper {
  static clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
  }
}
