import * as Yup from 'yup';

export default Yup.object().shape({
    time: Yup.string()
        .min(2, 'O campo é obrigatório.')
        .required('O campo é obrigatório.'),
    cellphone: Yup.string()
        .required('O campo é obrigatório.'),
    salary: Yup.string()
        .required('O campo é obrigatório.'),
    valuePerHour: Yup.string()
        .required('O campo é obrigatório.'),
});