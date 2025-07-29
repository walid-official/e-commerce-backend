import { IOrder, Order } from "./order.model";


export const createOrderService = async (orderData: Partial<IOrder>) => {
  const order = new Order(orderData);
  return await order.save();
};
