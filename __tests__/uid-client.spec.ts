import { server } from '@test/uid.mock.js'
import { UIDClient } from '@src/uid-client.js'
import './polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('UIDClient', () => {
  test('nanoid(): Promise<string>', async () => {
    const client = createClient()

    const result = await client.nanoid()

    expect(result).toBe('nanoid')
  })

  test('uuid(): Promise<string>', async () => {
    const client = createClient()

    const result = await client.uuid()

    expect(result).toBe('uuid')
  })
})

function createClient() {
  return new UIDClient({ server: 'http://localhost' })
}
