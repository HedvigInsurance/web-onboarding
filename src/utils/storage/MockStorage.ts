import { MinimalStorage } from './MinimalStorage'

export class MockStorage implements MinimalStorage {
  constructor(private mockState: any = {}) {}

  public getItem(field: string) {
    return this.mockState[field]
  }

  public setItem(field: string, value: string) {
    this.mockState = { ...this.mockState, [field]: value }
  }
}
