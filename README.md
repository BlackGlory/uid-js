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
