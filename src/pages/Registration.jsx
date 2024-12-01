import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

// Define the SIGNUP mutation
const SIGN_UP = gql`
  mutation SignUp($fullName: String!, $mobileNumber: String!, $email: String!, $dateOfBirth: String!, $password: String!) {
    signUp(fullName: $fullName, mobileNumber: $mobileNumber, email: $email, dateOfBirth: $dateOfBirth, password: $password) {
      success
      message
      token
    }
  }
`;


const Registration = () => {
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        fullName: "",
        mobileNumber: "",
        email: "",
        dateOfBirth: "",
        password: ""
    });

    // Define the mutation using Apollo Client's useMutation hook

    const [signUp, { data, loading, error }] = useMutation(SIGN_UP);


    // Handle changes in form inputs

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await signUp({
                variables: {
                    fullName: formdata.fullName,
                    mobileNumber: formdata.mobileNumber,
                    email: formdata.email,
                    dateOfBirth: formdata.dateOfBirth,
                    password: formdata.password
                }
            });



            if (response.data.signUp.success) {
                console.log("Success:", response.data.signUp.message);
                navigate("/login");
            } else {
                console.log("Error:", response.data.signUp.message);
            }
        } catch (err) {
            console.error("GraphQL error:", err);
        }
    };

    return (
        <div className="registration absolute  bg-slate-900 h-screen w-screen text-white flex-center flex-col">

            <center><img src="src/assets/images/bg-logo.png" alt="Logo" /></center>
            <form className="w-[26.75rem] flex-center flex-col gap-2" onSubmit={handleSubmit}>
                <input
                    className="registration_fullname bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    value={formdata.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    className="registration_number bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    value={formdata.mobileNumber}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={10}
                    required
                />
                <input
                    className="registration_email bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="email"
                    placeholder="E-Mail"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="registration_dob bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="date"
                    name="dateOfBirth"
                    value={formdata.dateOfBirth}
                    onChange={handleChange}
                    required
                />
                <input
                    className="registration_password bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formdata.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-700 mb-4 w-1/2 text-white size-[2.5rem] px-4 py-2 rounded-lg active:scale-[0.85]"
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
                {error && <p>Error: {error.message}</p>}
                {data && !data.signUp.success && <p>{data.signUp.message}</p>}
            </form>
        </div>
    );
};

export default Registration;
