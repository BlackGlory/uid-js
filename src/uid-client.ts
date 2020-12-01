import { get } from './utils'

export interface UIDClientOptions {
  server: string
}

export class UIDClient {
  constructor(private options: UIDClientOptions) {}

  async nanoid(): Promise<string> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/nanoid'
    })
    return res.text()
  }

  async uuid(): Promise<string> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/uuid'
    })
    return res.text()
  }
}
