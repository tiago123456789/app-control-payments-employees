import * as Yup from 'yup';

export default Yup.object().shape({
    description: Yup.string()
        .required('O campo é obrigatório.'),
    value: Yup.string()
        .required('O campo é obrigatório.'),
});