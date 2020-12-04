import { fetch } from 'cross-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'
import { checkHTTPStatus, toText } from './utils'

export interface UIDClientOptions {
  server: string
}

export class UIDClient {
  constructor(private options: UIDClientOptions) {}

  async nanoid(): Promise<string> {
    const req = get(
      url(this.options.server)
    , pathname('/nanoid')
    )

    return await fetch(req)
      .then(checkHTTPStatus)
      .then(toText)
  }

  async uuid(): Promise<string> {
    const req = get(
      url(this.options.server)
    , pathname('/uuid')
    )

    return await fetch(req)
      .then(checkHTTPStatus)
      .then(toText)
  }
}
