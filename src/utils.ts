import { fetch, Headers } from 'cross-fetch'
import { HTTPError } from './errors'

export async function get(
  { baseUrl, pathname, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = resolve(baseUrl, pathname)
  const headers = new Headers()
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)
  const res = await fetch(url, { headers, signal })
  checkHTTPStatus(res)
  return res
}

function resolve(baseUrl: string, pathname: string): string {
  return new URL(pathname, baseUrl).href
}

function checkHTTPStatus(res: Response) {
  if (!res.ok) throw new HTTPError(res)
}
