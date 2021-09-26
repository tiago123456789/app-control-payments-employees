import * as Yup from 'yup';

export default Yup.object().shape({
    time: Yup.string()
        .required('O campo é obrigatório.'),
});