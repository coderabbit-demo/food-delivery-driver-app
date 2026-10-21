# food-delivery-driver-app

Driver app client for [food-delivery-api](https://github.com/coderabbit-demo/food-delivery-api). It loads an order and turns it into a delivery task with pickup and drop-off times and the amount to collect.

## API fields this app depends on

| Field | Used in | For |
| --- | --- | --- |
| `etaMinutes` | `src/dispatch.ts` | Drop-off deadline (`createdAt` + `etaMinutes`) and pickup time |
| `totalCents` | `src/dispatch.ts` | Cash-on-delivery amount |
| `createdAt` | `src/dispatch.ts` | Start of the delivery window |

Renaming or removing any of these in food-delivery-api breaks dispatch.

## Check it

```bash
npm install
npm run typecheck
```
