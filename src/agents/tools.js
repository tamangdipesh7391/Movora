// const ProductSchema = z.object({
//     id: z.number().min(1).describe("Unique identifier for the product"),
//     name: z.string().min(2).max(100),
//     category: z.string().min(2).max(50),
//     brand: z.string().min(2).max(50),
//     price: z.number().min(0),
//     stock: z.number().min(0),
//     rating: z.number().min(0).max(5),
//     keywords: z.array(z.string()).min(1).max(10)
// });

import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { products } from './data.js';

export const searchProductTool = tool(
    ({ value }) => {
        const searchValue = value.toLowerCase();

        const results = products.filter((item) => {
            return item.keywords.some((keyword) => keyword.toLocaleLowerCase().includes(searchValue))
        })

        if (results.length === 0) {
            return "NO products found."
        }

        return JSON.stringify(results)
    },
    {
        name: 'search_product',
        description: `search product by exactly one field: 
    product name , category or brand . 
    use value for that field , never use the customer's full sentence.
    `,
        schema: z.object({
            value: z.string().describe('only the name , category or brand')
        })
    }
)
