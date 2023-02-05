import { server } from '@test/uid.mock.js'
import { UIDClient } from '@src/uid-client.js'
import './polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('UIDClient', () => {
  test('generateNanoID', async () => {
    const client = createClient()

    const result = await client.generateNanoID()

    expect(result).toBe('nanoid')
  })

  test('generateUUID', async () => {
    const client = createClient()

    const result = await client.generateUUID()

    expect(result).toBe('uuid')
  })
})

function createClient() {
  return new UIDClient({ server: 'http://localhost' })
}
