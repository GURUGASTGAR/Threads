import zod from 'zod'


export const postSchema = zod.object({
     content: zod.string().min(10)
})


