'use client'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { ResetPasswordSchema } from '@/schemas/user'
import { useTransition } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { resetPasswordRequest } from '@/actions/reset-password-token'
import { useRouter } from 'next/navigation'

export default function ResetPasswordForm() {
    const [isPending, starTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        starTransition(async () => {
            const data = await resetPasswordRequest(values)
            toast({
                title: data.error ? 'Oops, something went wrong!' : 'Success',
                description: data.error || data.success,
            })
            if (data.success) {
                router.push('/login')
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="m@example.com"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Send Reset Email
                    </Button>
                </div>
            </form>
        </Form>
    )
}
