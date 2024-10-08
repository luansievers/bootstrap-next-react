'use client'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { NewPasswordSchema } from '@/schemas/user'
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
import { saveNewPassword } from '@/actions/reset-password-token'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NewPasswordForm() {
    const [isPending, starTransition] = useTransition()

    const searchParams = useSearchParams()
    const router = useRouter()

    const token = searchParams.get('token')

    if (!token) {
        toast({
            title: 'Oops, something went wrong!',
            description: 'Token is missing',
        })
        router.push('/login')
    }

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        starTransition(async () => {
            const data = await saveNewPassword(values, token)
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="******"
                                            autoComplete="off"
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
                        Reset password
                    </Button>
                </div>
            </form>
        </Form>
    )
}
