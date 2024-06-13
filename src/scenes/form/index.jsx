import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import '../CSS/Form.css'



const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
   
  
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        
        
      }}>
    <Box m="20px"  className='container'>
      {/* <Header title="CREATE USER"  subtitle="Create a New User Profile"  /> */}
    <div className="container_h">
      <h2> Team Member</h2>
      <h5> Create a New Member Profile</h5><br></br>
    </div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                
                type="text"
                label="First Name"
            
                onBlur={handleBlur}
               
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
                
                InputLabelProps={{
                    style: { color: 'black' } // Change the label color here
                  }}
                  InputProps={{
                    style: { borderBottom: '2px solid black' } // Change the underline color here
                  }}
                
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{
                    style: { color: 'black' } // Change the label color here
                  }}
                  InputProps={{
                    style: { borderBottom: '2px solid black' } // Change the underline color here
                  }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{
                    style: { color: 'black' } // Change the label color here
                  }}
                  InputProps={{
                    style: { borderBottom: '2px solid black' } // Change the underline color here
                  }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{
                    style: { color: 'black' } // Change the label color here
                  }}
                  InputProps={{
                    style: { borderBottom: '2px solid black' } // Change the underline color here
                  }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Access Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{
                    style: { color: 'black'  } // Change the label color here
                  }}
                  InputProps={{
                    style: { borderBottom: '2px solid black' } // Change the underline color here
                  }}
              />
              
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained" style={{
                 background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Change the gradient colors here
                 border: 0,
                 borderRadius: 4,
                 boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                 color: 'white',
                 height: 48,
                 padding: '0 30px',
              }}>
                Add Team Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </div>
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  
};



export default Form;