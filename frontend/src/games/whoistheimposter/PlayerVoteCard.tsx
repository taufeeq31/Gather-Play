import Button from '../../components/Button';

type Props = {
	name: string;
	selected: boolean;
	onSelect: () => void;
};

function PlayerVoteCard({ name, selected, onSelect }: Props) {
	return (
		<Button
			type="button"
			variant="secondary"
			aria-pressed={selected}
			onClick={onSelect}
			className={`relative h-auto min-h-28 w-full justify-between gap-2 whitespace-normal break-words px-3 py-4 text-left ${selected ? 'border-4 border-tomato bg-mustard shadow-[3px_3px_0_0_#141414]' : ''}`}
		>
			<span className="min-w-0">{name}</span>
			{selected && <span aria-hidden="true" className="font-heading text-2xl leading-none">✓</span>}
		</Button>
	);
}

export default PlayerVoteCard;
