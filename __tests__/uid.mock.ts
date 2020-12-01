import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.get('/nanoid', (req, res, ctx) => {
    return res(ctx.status(200), ctx.text('nanoid'))
  })
, rest.get('/uuid', (req, res, ctx) => {
    return res(ctx.status(200), ctx.text('uuid'))
  })
)
