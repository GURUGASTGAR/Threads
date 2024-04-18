import zod from 'zod'

export const signupSchema = zod.object({
    name: zod.string().min(3).max(50),
    username: zod.string().min(3).max(50),
    password: zod.string().min(6),
    password_confirm:zod.string().min(6),
    email: zod.string().email()
}).strict();

export const loginSchema = zod.object({
    password: zod.string(),
    email: zod.string().email()
}).strict();