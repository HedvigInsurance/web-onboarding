import { MinimalStorage } from './MinimalStorage'

export class MockStorage implements MinimalStorage {
  constructor(private mockState: any = {}) {}

  public getItem(field: string) {
    return this.mockState[field]
  }

  public setItem(field: string, value: string) {
    this.mockState = { ...this.mockState, [field]: value }
  }

  public removeItem(item: string): void {
    this.mockState = Object.keys(this.mockState)
      .filter((key) => key !== item)
      .reduce((acc, curr) => ({ ...acc, [curr]: this.mockState[curr] }), {})
  }
}
