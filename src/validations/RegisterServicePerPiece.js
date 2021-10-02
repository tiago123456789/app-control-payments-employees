import * as Yup from 'yup';

export default Yup.object().shape({
    description: Yup.string()
        .min(2, 'O campo é obrigatório.')
        .required('O campo é obrigatório.'),
    valuePerPiece: Yup.string()
        .required('O campo é obrigatório.'),
    quantityPieces: Yup.number()
        .min(1, "O valor deve ser no mínimo 1.")
        .required('O campo é obrigatório.'),
});