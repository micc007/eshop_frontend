import { OrderItemType } from "./OrderItemType"
import { NonRegCustType } from "./NonRegCustType"

export type OrderDataType = {
    cust_reg: boolean,
    reg_cust_id: string,
    non_reg_cust: NonRegCustType,
    items: OrderItemType[],
    delivery: "courier" | "onsite",
    payment_method: "cash" | "payp" | "bank"
}