import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, signal, keepalive } from 'extra-request/lib/es2018/transformers'
import { ok, toText } from 'extra-response'

export interface IUIDClientOptions {
  server: string
  keepalive?: boolean
}

export interface IUIDClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
}

export class UIDClient {
  constructor(private options: IUIDClientOptions) {}

  async nanoid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      url(this.options.server)
    , pathname('/nanoid')
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }
}
