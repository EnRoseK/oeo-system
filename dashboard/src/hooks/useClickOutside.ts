import { useEffect, useRef, useState } from 'react';
import { assertIsNode } from '@/utils';

export const useClickOutside = () => {
	const [show, setShow] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const closeOnClickOutside = (e: MouseEvent) => {
			assertIsNode(e.target);
			if (ref.current && show && !ref.current.contains(e.target)) {
				setShow(false);
			}
		};

		document.addEventListener('mousedown', closeOnClickOutside);

		return () => {
			document.removeEventListener('mousedown', closeOnClickOutside);
		};
	}, [show]);

	return [show, setShow, ref] as const;
};
