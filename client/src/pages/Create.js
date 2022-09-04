import React from 'react'
import { Formik , Form , Field , ErrorMessage } from "formik"
import * as Yup from 'yup'
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Create() {

        const initialValues = {
            title: "",
            postText: "",
            username: "",
        };

        const validationSchema = Yup.object().shape({
            title: Yup.string().required("You must input a Title!"),
            postText: Yup.string().required(),
            username: Yup.string().min(3).max(15).required(),
        });

        const onSubmit = (data) => {
            axios.post("http://localhost:3001/posts", data).then((response) => {
            navigate("/")
            });
        };

        let navigate = useNavigate()

        return (
            <div className='createPostPage'>
                <Formik initialValues={initialValues} onSubmit = {onSubmit}
                validationSchema = {validationSchema}
                >
                    <Form className='formContainer'>
                        <label>Title : </label>
                        <ErrorMessage name="title" component="span" />
                        <Field 
                            id ="inputCreatePost" 
                            name="title" 
                            placeholder = "SAD.."/>
                        <label>Post : </label>
                        <ErrorMessage name="postText" component="span" />
                        <Field 
                            id ="inputCreatePost" 
                            name="postText" 
                            placeholder = "Mypost.."/>
                        <label>Username : </label>
                        <ErrorMessage name="username" component="span" />
                        <Field 
                            id ="inputCreatePost" 
                            name="username"
                            placeholder = "Johnn.."/>
                        <button type = "submit">Create post</button>
                    </Form>
                </Formik>
            </div>
        )
    }

export default Create
