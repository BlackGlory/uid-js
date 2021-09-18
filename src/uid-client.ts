import { fetch } from 'extra-fetch'
import { get, IHTTPOptionsTransformer } from 'extra-request'
import { url, pathname, signal, keepalive } from 'extra-request/transformers/index.js'
import { ok, toText } from 'extra-response'
import { raceAbortSignals, timeoutSignal } from 'extra-promise'

export interface IUIDClientOptions {
  server: string
  keepalive?: boolean
  timeout?: number
}

export interface IUIDClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class UIDClient {
  constructor(private options: IUIDClientOptions) {}

  private getCommonTransformers(
    options: IUIDClientRequestOptions
  ): Array<IHTTPOptionsTransformer> {
    return [
      url(this.options.server)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }

  async nanoid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/nanoid')
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  async uuid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/uuid')
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }
}
