# uid-js

## Install

```sh
npm install --save @blackglory/uid
# or
yarn add @blackglory/uid
```

## API

### UIDClient

```ts
new UIDClient({ server: string })
```

#### nanoid

```ts
UIDClient#nanoid(): Promise<string>
```

#### uuid

```ts
UIDClient#uuid(): Promise<string>
```
