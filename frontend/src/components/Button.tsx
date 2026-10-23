import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	variant?: 'primary' | 'secondary';
	children: ReactNode;
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
	primary: 'bg-tomato text-ink',
	secondary: 'bg-surface text-ink',
};

function Button({
	variant = 'primary',
	className = '',
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={`inline-flex h-12 min-h-12 items-center justify-center rounded-lg border-2 border-ink px-5 font-heading text-base font-bold shadow-[4px_4px_0_0_#141414] transition-[transform,box-shadow] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0_0_#141414] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
