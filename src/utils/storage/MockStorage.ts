import { MinimalStorage } from './MinimalStorage'

export class MockStorage implements MinimalStorage {
  constructor(private readonly mockState?: string) {}

  public getItem(_: string) {
    return this.mockState || '{}'
  }

  // tslint:disable-next-line variable-name
  public setItem(_noop: string, _noop2: string) {
    /* noop */
  }
}
