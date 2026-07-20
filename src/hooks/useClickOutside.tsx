import { useEffect, useCallback, RefObject } from 'react';

export function useClickOutside(
	isOpen: boolean,
	close: () => void,
	formRef: RefObject<Element>,
	buttonRef: RefObject<Element>
) {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!isOpen) return;

			const target = event.target as Node;

			if (
				formRef.current &&
				!formRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				close();
			}
		},
		[isOpen, formRef, buttonRef]
	);

	useEffect(() => {
		const handler = (event: MouseEvent) => handleClickOutside(event);

		if (isOpen) {
			document.addEventListener('mousedown', handler);
		} else {
			document.removeEventListener('mousedown', handler);
		}

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, [isOpen, handleClickOutside]);
}
