import { useEffect } from 'react';

type ClickOutside = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClickOutside = ({
	isOpen,
	onChange,
	onClose,
	rootRef,
}: ClickOutside) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose?.();
				onChange?.(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
