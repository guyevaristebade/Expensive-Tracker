import clsx from 'clsx'
import React from 'react'

// export interface RoomCardDetailProps {
//     label?: string
//     amount: number | string
//     currency?: string
//     className?: string
//     labelClassName?: string
//     amountClassName?: string
// }

type Variant = 'purple' | 'green' | 'blue' | 'yellow' | 'pink'
type RoomCardDetailProps = {
    label?: string
    amount: number | string
    currency?: string
    variant?: Variant
    description?: string
}

export const RoomCardDetail: React.FC<RoomCardDetailProps> = ({
    label,
    amount,
    currency,
    variant,
    description,
}) => {
    const styles: Record<
        Variant,
        {
            container: string
            label: string
            amount: string
            description?: string
        }
    > = {
        purple: {
            container: 'bg-purple-50 border-purple-200',
            label: 'text-purple-600',
            amount: 'text-purple-700',
            description: 'text-purple-500',
        },
        green: {
            container: 'bg-emerald-50 border-emerald-200',
            label: 'text-emerald-600',
            amount: 'text-emerald-700',
            description: 'text-emerald-500',
        },
        blue: {
            container: 'bg-blue-50 border-blue-200',
            label: 'text-blue-600',
            amount: 'text-blue-700',
            description: 'text-blue-500',
        },
        yellow: {
            container: 'bg-yellow-50 border-yellow-200',
            label: 'text-yellow-600',
            amount: 'text-yellow-700',
            description: 'text-yellow-500',
        },
        pink: {
            container: 'bg-pink-50 border-pink-200',
            label: 'text-pink-600',
            amount: 'text-pink-700',
            description: 'text-pink-500',
        },
    }

    const v = styles[variant as Variant]

    return (
        <div
            className={clsx('w-full rounded-xl border px-6 py-5', v.container)}
        >
            <p className={clsx('text-sm font-medium', v.label)}>{label}</p>

            <p className={clsx('mt-1 text-3xl font-bold', v.amount)}>
                {currency}
                {label == 'Articles' ? amount : Number(amount).toLocaleString()}
            </p>
            <p className={clsx('text-sm', v.description)}>{description}</p>
        </div>
    )
}
