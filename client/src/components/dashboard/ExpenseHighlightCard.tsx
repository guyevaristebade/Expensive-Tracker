import  { type LucideIcon } from 'lucide-react';
import React from 'react';

type VariantType =  "more" | "less";

type ExpenseHighlightCardProps = {
    title : string;
    label : string;
    amount : number;
    icon : LucideIcon,
    variant : VariantType,
}

export const ExpenseHighlightCard : React.FC<ExpenseHighlightCardProps>= ({
  title,
  label,
  amount,
  icon,
  variant = 'success',
}) => {
  const variants = {
    more: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: 'text-green-700',
        amount: 'text-green-700',
    },
    less: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        title: 'text-blue-700',
        amount: 'text-blue-600',
    },
  };

  const styles = variants[variant as VariantType];
  const Icon = icon
  return (
    <div
      className={`
        flex items-center justify-between
        rounded-2xl border p-6
        ${styles.bg} ${styles.border}
      `}
    >
      <div className="space-y-2">
        <p className={`text-sm font-medium ${styles.title}`}>
          {label}
        </p>

        <h3 className="text-3xl font-bold text-gray-900">
          {title}
        </h3>

        <p className={`text-xl font-semibold ${styles.amount}`}>
          ${amount.toFixed(2)}
        </p>
      </div>

      <div className="text-4xl">
        {<Icon size={40} className={styles.title}/>}
      </div>
    </div>
  );
};
