import React from "react"

export default ({ formik, field }) => {
    if (formik.errors[field] && formik.touched[field]) {
        return (<div className="text-danger">{formik.errors[field]}</div>)
    }
    return false;
}