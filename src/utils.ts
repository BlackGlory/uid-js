import { fromCode } from '@blackglory/http-status'

export function checkHTTPStatus(res: Response): Response {
  if (!res.ok) throw fromCode(res.status)
  return res
}

export function toText(res: Response): Promise<string> {
  return res.text()
}
