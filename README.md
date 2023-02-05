# uid-js
## Install
```sh
npm install --save @blackglory/uid-js
# or
yarn add @blackglory/uid-js
```

## API
### UIDClient
```ts
interface IUIDClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IUIDClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class UIDClient {
  constructor(options: IUIDClientOptions)

  generateNanoID(options: IUIDClientRequestOptions = {}): Promise<string>
  generateUUID(options: IUIDClientRequestOptions = {}): Promise<string>
}
```
