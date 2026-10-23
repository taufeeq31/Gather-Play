import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	shadow?: boolean;
};

function Card({ className = '', children, shadow = true, ...props }: CardProps) {
	return (
		<div
			className={`rounded-xl border-2 border-ink bg-surface ${shadow ? 'shadow-[4px_4px_0_0_#141414]' : ''} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export default Card;
