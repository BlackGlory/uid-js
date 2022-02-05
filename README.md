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
new UIDClient({
  server: string
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IUIDClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### nanoid

```ts
UIDClient#nanoid(options?: IUIDClientRequestOptions): Promise<string>
```

#### uuid

```ts
UIDClient#uuid(options?: IUIDClientRequestOptions): Promise<string>
```
