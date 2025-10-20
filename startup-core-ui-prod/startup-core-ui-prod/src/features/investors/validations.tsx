import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
});

export const validationForReviewSchema = yup.object().shape({
  expiry_date_in_days: yup.number().required('Required'),
});
