import { MinimalStorage } from './MinimalStorage'

export class NoopStorage implements MinimalStorage {
  public getItem(_: string) {
    return '{}'
  }

  // tslint:disable-next-line variable-name
  public setItem(_noop: string, _noop2: string) {
    /* noop */
  }
}
