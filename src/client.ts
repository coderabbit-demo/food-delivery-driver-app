// Response shapes from coderabbit-demo/food-delivery-api. Keep in sync with
// the order endpoints in that repo's src/app.ts.

export type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

export interface Order {
  id: string;
  restaurantId: string;
  customerId: string;
  status: OrderStatus;
  subtotalCents: number;
  deliveryFeeCents: number;
  tipCents: number;
  totalCents: number;
  etaMinutes: number;
  createdAt: string;
}

export interface ClientOptions {
  baseUrl: string;
  restaurantId: string;
}

export async function fetchOrder(options: ClientOptions, orderId: string): Promise<Order> {
  const url = `${options.baseUrl}/restaurants/${encodeURIComponent(options.restaurantId)}/orders/${encodeURIComponent(orderId)}`;
  const res = await fetch(url, { headers: { "x-restaurant-id": options.restaurantId } });
  if (!res.ok) {
    throw new Error(`Failed to load order ${orderId}: ${res.status}`);
  }
  return (await res.json()) as Order;
}
