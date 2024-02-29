declare global {
  interface String {
    toFirstCharString(): string;
  }
}

String.prototype.toFirstCharString = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
