import * as yup from 'yup';

export const categoryCreateAndUpdateValidation = yup.object().shape({
	title: yup.string().required('Нэр хоосон байж болохгүй'),
	description: yup.string().optional(),
});
