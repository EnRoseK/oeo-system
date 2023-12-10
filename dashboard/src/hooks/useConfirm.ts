import { ConfirmContext } from '@/providers';
import { useContext, useEffect, useState } from 'react';

export const useConfirm = () => {
	const { confirm, setConfirm } = useContext(ConfirmContext);
	const [needsCleanup, setNeedsCleanup] = useState(false);

	const isConfirmed = (prompt: string) => {
		setNeedsCleanup(true);
		const promise = new Promise((resolve, reject) => {
			setConfirm({
				prompt,
				isOpen: true,
				proceed: resolve,
				cancel: reject,
			});
		});

		return promise.then(
			() => {
				setConfirm((prev) => ({ ...prev, isOpen: false }));
				return true;
			},
			() => {
				setConfirm((prev) => ({ ...prev, isOpen: false }));
				return false;
			}
		);
	};

	useEffect(() => {
		return () => {
			if (confirm?.cancel && needsCleanup) {
				confirm.cancel();
			}
		};
	}, [confirm, needsCleanup]);

	return { ...confirm, isConfirmed };
};
