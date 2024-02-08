import EComForm from "../../components/form/EComForm";
import EComInput from "../../components/form/EComInput";
import EComSelect from "../../components/form/EComSelect";

const Register = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Register</h1>
      <EComForm onSubmit={onSubmit}>
        <EComInput
          type="text"
          name="userName"
          label="User Name"
        />
        <EComInput
          type="text"
          name="name.firstName"
          label="First Name"
        />
        <EComInput
          type="text"
          name="name.middleName"
          label="Middle Name"
        />
        <EComInput
          type="text"
          name="name.lastName"
          label="Last Name"
        />
        <EComSelect
          label="Gender"
          name="gender"
          options={[
            {
              value: "male",
              label: "Male",
            },
            {
              value: "female",
              label: "Female",
            },
            {
              value: "other",
              label: "Other",
            },
          ]}
        />
        <EComInput
          type="text"
          name="email"
          label="Email"
        />
        <EComInput
          type="text"
          name="mobileNo"
          label="Mobile No"
        />
        <EComInput
          type="text"
          name="password"
          label="Password"
        />
      </EComForm>
    </div>
  );
};

export default Register;

// {
//     "userName": "customer",
//     "name": {
//       "firstName": "Customer",
//       "middleName": "Nazmus",
//       "lastName": "Sakib"
//     },
//     "gender": "male",
//     "email": "customer@example.com",
//     "mobileNo": "012323232323",
//     "image": "https://example.com/profile.jpg"
//   }
// }
