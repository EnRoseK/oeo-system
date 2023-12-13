import React, { FC } from 'react';
import { SmallButton } from '../form';
import { DeleteIcon, UpdateIcon } from '@/assets/icons';

interface ActionButtonsProps {
  editHandler?: () => void;
  deleteHandler?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  editHandler,
  deleteHandler,
  showDelete = true,
  showEdit = true,
}) => {
  return (
    <td className='p-4 space-x-2 whitespace-nowrap'>
      {showEdit && (
        <SmallButton onClick={() => editHandler && editHandler()} variant='primary' Icon={UpdateIcon}>
          Шинэчлэх
        </SmallButton>
      )}
      {showDelete && (
        <SmallButton onClick={() => deleteHandler && deleteHandler()} variant='danger' Icon={DeleteIcon}>
          Устгах
        </SmallButton>
      )}
    </td>
  );
};
