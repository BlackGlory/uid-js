import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toText } from 'extra-response'

export interface IUIDClientOptions {
  server: string
}

export interface IUIDClientRequestOptions {
  signal?: AbortSignal
}

export class UIDClient {
  constructor(private options: IUIDClientOptions) {}

  async nanoid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      url(this.options.server)
    , pathname('/nanoid')
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  async uuid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      url(this.options.server)
    , pathname('/uuid')
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }
}
