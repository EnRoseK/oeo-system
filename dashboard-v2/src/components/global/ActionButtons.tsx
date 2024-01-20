import { FC } from 'react';
import { DeleteIcon, UpdateIcon } from '@/assets/icons';
import { Button } from '@/components';

interface ActionButtonsProps {
  editHandler?: () => void;
  deleteHandler?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
  editLabel?: string;
}

export const ActionButtons: FC<ActionButtonsProps> = (props) => {
  const { editHandler, deleteHandler, showDelete = true, showEdit = true, editLabel = 'Шинэчлэх' } = props;

  return (
    <td className='p-4 space-x-2 whitespace-nowrap'>
      {showEdit && (
        <Button onClick={() => editHandler && editHandler()} variant='primary' size='small' Icon={UpdateIcon}>
          {editLabel}
        </Button>
      )}
      {showDelete && (
        <Button onClick={() => deleteHandler && deleteHandler()} variant='danger' size='small' Icon={DeleteIcon}>
          Устгах
        </Button>
      )}
    </td>
  );
};
