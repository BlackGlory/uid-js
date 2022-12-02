import { server } from '@test/uid.mock.js'
import { UIDClient } from '@src/uid-client.js'
import '@blackglory/jest-matchers'
import './polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('UIDClient', () => {
  test('nanoid(): Promise<string>', async () => {
    const client = createClient()

    const result = client.nanoid()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('nanoid')
  })

  test('uuid(): Promise<string>', async () => {
    const client = createClient()

    const result = client.uuid()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('uuid')
  })
})

function createClient() {
  return new UIDClient({ server: 'http://localhost' })
}
