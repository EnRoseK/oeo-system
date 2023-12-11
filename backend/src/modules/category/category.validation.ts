import * as yup from 'yup';

export const createAndUpdateCategoryValidation = yup.object().shape({
	body: yup.object().shape({
		title: yup.string().required('Нэр хоосон байж болохгүй'),
		description: yup.string().optional(),
	}),
});
