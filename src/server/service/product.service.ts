import { db } from "@/utils/db"
import { NewProduct } from "../schema"

export const Product = {
    create: async (input: NewProduct) => {
        
    },
    find: async () => {
        return await db.query.product.findMany()
    }
}