
import React from 'react'

const AddMovie = () => {
    return (
        <div>
            <form className="form-control p-2">
                <div className="container d-flex justify-content-center mt-5 p-2" style={{ width: "70vw" }}>
                    <div className="card" style={{ width: "40vw" }}>
                        <div className="mt-2 mx-5">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Movie Name</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Movie Actors</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                            </div>
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label">Movie Director</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Movie Certification</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Movie Genre</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Movie Length</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Movie Release Date</label>
                                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Availabe from</label>
                                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Available to</label>
                                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">First Show</label>
                                    <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Second Show</label>
                                    <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                            </div>
                            <div class="row">
                                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button> */}
                            </div>
                            <div className="row mb-5">
                                <button type="button" class="btn btn-primary">Primary</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddMovie

// import React from 'react'
// import { Formik, Form, useFormikContext } from 'formik'

// import * as Yup from 'yup'
// import { Grid, Typography } from '@material-ui/core'
// import TextField from './FormsUI/TextField'
// // import Select from './FormsUI/Select'
// import DateTimePicker from './FormsUI/DateTimePicker'
// import TimePicker from './FormsUI/TimePicker'
// import Button from './FormsUI/Button'
// import FileField from './FormsUI/FileField'
// import Axios from "axios";
// // import UploadForm from "./FormsUI/UploadForm/Forms/UploadForm"

// const initial_state = {
//     name: '',
//     actors: '',
//     director: '',
//     certification: '',
//     genre: '',
//     length: '',
//     release_date: '',
//     start_date: '',
//     end_date: '',
//     first_show: '',
//     second_show: '',
//     image: '',
// }

// const formValidations = Yup.object().shape({
//     name: Yup.string().required('Required field'),
//     actors: Yup.string().required('Required field'),
//     director: Yup.string().required('Required field'),
//     certification: Yup.string().required('Required field'),
//     genre: Yup.string().required('Required field'),
//     length: Yup.number().integer().typeError('Enter valid number').required('Required field'),
//     release_date: Yup.date().required('Required field'),
//     start_date: Yup.date().min(
//         Yup.ref('release_date'),
//         "start date can't be before release date"
//     ).required('Required field'),
//     end_date: Yup.date().min(
//         Yup.ref('start_date'),
//         "end date can't be before start date"
//     ).required('Required field'),
//     first_show: Yup.string().required('Required field'),
//     second_show: Yup.string().required('Required field'),
//     // image: Yup.mixed().required('File is required'),
//     // image: "",
// })

// const AddMovie = () => {
//     // const { setFieldValue } = useFormikContext();
//     return (
//         <div className="container mt-2 p-5 shadow border">
//             <Formik
//                 initialValues={{ ...initial_state }}
//                 validationSchema={formValidations}
//                 onSubmit={values => {
//                     console.log(values)
//                     Axios.post('/movieregister',
//                         values, {
//                         headers: {
//                             Accept: 'application/json',
//                             'Content-Type': 'multipart/form-data'
//                         }
//                     }
//                     ).then(function () {
//                         console.log('SUCCESS!!');
//                     })
//                         .catch(function () {
//                             console.log('FAILURE!!');
//                         });
//                 }}
//             >
//                 <Form>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <Typography>Movie Details</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 name="name"
//                                 label="Movie Name"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 name="actors"
//                                 label="Movie actors"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 name="director"
//                                 label="Movie director"
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 name="certification"
//                                 label="Movie certificate" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 name="genre"
//                                 label="Movie genre" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 name="length"
//                                 label="Movie length" />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography>Date and Time</Typography>
//                         </Grid>
//                         <Grid item xs={4}>
//                             <DateTimePicker
//                                 name="release_date"
//                                 label="Movie release date" />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <DateTimePicker
//                                 name="start_date"
//                                 label="Tickets from" />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <DateTimePicker
//                                 name="end_date"
//                                 label="Tickets To" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TimePicker
//                                 name="first_show"
//                                 label="First show time" />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TimePicker
//                                 name="second_show"
//                                 label="Second show time" />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography>Image Upload</Typography>
//                         </Grid>
//                         {/* <FormUpload /> */}
//                         {/* <UploadForm /> */}
//                         {/* <Grid item xs={12}>
//                             <FileField
//                                 // type="file"
//                                 name="image"
//                             />
//                         </Grid> */}
//                         {/* <input id="file" name="file" type="file" onChange={(event) => {
//                             setFieldValue("image", event.target.files[0]);
//                         }} className="form-control" /> */}
//                         <Grid item xs={12}>
//                             <Button>
//                                 Add Movie
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Form>
//             </Formik>
//             {/* <FileField /> */}
//             <input type="file" onChange={(event) => {
//                 console.log(event.target.files[0])
//                 console.log(event.target)
//                 // setFieldValue("image", event.target.files[0])
//             }} />
//         </div>
//     )
// }

// export default AddMovie