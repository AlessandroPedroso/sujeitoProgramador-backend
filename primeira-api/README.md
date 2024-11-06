# Guia de instalação com TypeScript

## Inicializando o Projeto

- `yarn init -y`
- `yarn add express`
- `yarn add typescript -D`
- `yarn tsc --init`
- `yarn add @types/express -D`
- `yarn add ts-node-dev -D`
- Dentro do package.json:

```
 "scripts": {
   "dev":"ts-node-dev --transpile-only src/server.ts"
 },

```
