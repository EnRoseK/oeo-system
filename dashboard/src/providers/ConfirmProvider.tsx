import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Popup } from '@/components/ui';

interface ConfirmProviderProps {
	children: ReactNode;
}

interface ConfirmType {
	prompt: string;
	isOpen: boolean;
	proceed: ((value: unknown) => void) | null;
	cancel: ((reason?: any) => void) | null;
}

interface ConfirmContextType {
	confirm: ConfirmType;
	setConfirm: Dispatch<SetStateAction<ConfirmType>>;
}

export const ConfirmContext = createContext<ConfirmContextType>({} as ConfirmContextType);

export const ConfirmProvider: FC<ConfirmProviderProps> = ({ children }) => {
	const [confirm, setConfirm] = useState<ConfirmType>({
		prompt: '',
		isOpen: false,
		proceed: null,
		cancel: null,
	});

	const value = { confirm, setConfirm };

	return (
		<ConfirmContext.Provider value={value}>
			{children}
			<Popup
				show={confirm.isOpen}
				confirm={confirm.proceed}
				cancel={confirm.cancel}
				title={confirm.prompt}
			/>
		</ConfirmContext.Provider>
	);
};
