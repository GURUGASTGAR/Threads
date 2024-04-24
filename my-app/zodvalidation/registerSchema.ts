import zod from 'zod'

export const signupSchema = zod.object({
    name: zod.string().min(3).max(50),
    username: zod.string().email(),
    password: zod.string().min(6)
})

export const loginSchema = zod.object({
    password: zod.string(),
    username: zod.string().email()
})