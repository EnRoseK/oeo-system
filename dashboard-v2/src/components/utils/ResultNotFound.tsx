import { FC } from 'react';

export const ResultNotFound: FC = () => {
  return (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className='w-full h-[150px] flex items-center justify-center'>
            <p className='text-sm text-gray-500'>Илэрц олдсонгүй</p>
          </div>
        </td>
      </tr>
    </tbody>
  );
};
