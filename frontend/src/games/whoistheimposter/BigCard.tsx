import type { HTMLAttributes, ReactNode } from 'react';
import Card from '../../components/Card';

type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	tone?: 'surface' | 'mustard' | 'tomato';
	animated?: boolean;
};

const tones = {
	surface: 'bg-surface',
	mustard: 'bg-mustard',
	tomato: 'bg-tomato',
};

function BigCard({ children, tone = 'surface', animated = false, className = '', ...props }: Props) {
	return <Card className={`flex min-h-[22rem] flex-col items-center justify-center px-6 py-8 text-center ${tones[tone]} ${animated ? 'reveal-card' : ''} ${className}`} {...props}>{children}</Card>;
}

export default BigCard;
