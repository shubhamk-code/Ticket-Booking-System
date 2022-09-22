import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Grid, Typography } from '@material-ui/core'
// import AddIcon from "@material-ui/icons/Add";
import TextField from './FormsUI/TextField'
// import Select from './FormsUI/Select'
import DateTimePicker from './FormsUI/DateTimePicker'
import TimePicker from './FormsUI/TimePicker'
import Button from './FormsUI/Button'
import FileField from './FormsUI/FileField'
import Axios from "axios";

const initial_state = {
    name: '',
    actors: '',
    director: '',
    certification: '',
    genre: '',
    length: '',
    release_date: '',
    start_date: '',
    end_date: '',
    first_show: '',
    second_show: '',
    // image: '',
}

const formValidations = Yup.object().shape({
    name: Yup.string().required('Required field'),
    actors: Yup.string().required('Required field'),
    director: Yup.string().required('Required field'),
    certification: Yup.string().required('Required field'),
    genre: Yup.string().required('Required field'),
    length: Yup.number().integer().typeError('Enter valid number').required('Required field'),
    release_date: Yup.date().required('Required field'),
    start_date: Yup.date().min(
        Yup.ref('release_date'),
        "start date can't be before release date"
    ).required('Required field'),
    end_date: Yup.date().min(
        Yup.ref('start_date'),
        "end date can't be before start date"
    ).required('Required field'),
    first_show: Yup.string().required('Required field'),
    second_show: Yup.string().required('Required field'),
    image: Yup.mixed().required('File is required'),
    // image: "",
})

const AddMovie = () => {
    return (
        <div className="container mt-2 p-5 shadow border">
            <Formik
                initialValues={{ ...initial_state }}
                validationSchema={formValidations}
                onSubmit={values => {
                    console.log(values)
                    Axios.post('/movieregister',
                        values, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    ).then(function () {
                        console.log('SUCCESS!!');
                    })
                        .catch(function () {
                            console.log('FAILURE!!');
                        });
                }}
            >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Movie Details</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Movie Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="actors"
                                label="Movie actors"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="director"
                                label="Movie director"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="certification"
                                label="Movie certificate" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="genre"
                                label="Movie genre" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="length"
                                label="Movie length" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Date and Time</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DateTimePicker
                                name="release_date"
                                label="Movie release date" />
                        </Grid>
                        <Grid item xs={6}>
                            <DateTimePicker
                                name="start_date"
                                label="Movie Ticket Start" />
                        </Grid>
                        <Grid item xs={6}>
                            <DateTimePicker
                                name="end_date"
                                label="Movie Ticket End" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                name="first_show"
                                label="First show time" />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                name="second_show"
                                label="Second show time" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Image Upload</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FileField
                                name="image"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button>
                                Add Movie
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            {/* <FileField /> */}
        </div>
    )
}

export default AddMovie