import type { Order } from "./client.js";

export interface DeliveryTask {
  orderId: string;
  pickupBy: Date;
  dropoffBy: Date;
  collectCents: number;
}

// Drivers should arrive at the restaurant this many minutes before delivery is due.
export const PICKUP_LEAD_MINUTES = 15;

export function toDeliveryTask(order: Order, cashOnDelivery: boolean): DeliveryTask {
  const placedAt = Date.parse(order.createdAt);
  const dropoffBy = new Date(placedAt + order.etaMinutes * 60_000);
  const pickupBy = new Date(dropoffBy.getTime() - PICKUP_LEAD_MINUTES * 60_000);

  return {
    orderId: order.id,
    pickupBy,
    dropoffBy,
    collectCents: cashOnDelivery ? order.totalCents : 0,
  };
}

export function formatCollection(task: DeliveryTask): string {
  return task.collectCents === 0 ? "Prepaid" : `Collect $${(task.collectCents / 100).toFixed(2)}`;
}
