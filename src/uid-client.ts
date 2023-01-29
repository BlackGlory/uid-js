import { fetch } from 'extra-fetch'
import { get, IRequestOptionsTransformer } from 'extra-request'
import { url, appendPathname, signal, keepalive, header, basicAuth } from 'extra-request/transformers'
import { ok, toText } from 'extra-response'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { Falsy } from 'justypes'

const expectedVersion = '^4.0.0'

export interface IUIDClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
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
  ): Array<IRequestOptionsTransformer | Falsy> {
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async nanoid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/nanoid')
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }

  /**
   * @throws {AbortError}
   */
  async uuid(options: IUIDClientRequestOptions = {}): Promise<string> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/uuid')
    )

    return await fetch(req)
      .then(ok)
      .then(toText)
  }
}
