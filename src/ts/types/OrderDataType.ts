import { OrderItemType } from "./OrderItemType"

export type OrderDataType = {
    cust_reg: boolean,
    reg_cust_id: string,
    non_reg_cust: object,
    items: OrderItemType[],
    delivery: "courier" | "onsite",
    payment_method: "cash" | "payp" | "bank"
}