import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Login = () => {
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    });

    const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
        success
        message
        token
    }
  }
`;

    const [errorMessage, setErrorMessage] = useState("");

    const [signIn, { data, loading, error }] = useMutation(SIGN_IN, {
        onCompleted: (data) => {

            if (data.signIn.success) {

                navigate("/index");
                window.location.reload()
            } else {
                setErrorMessage(data.signIn.message);
            }
        },
        onError: (err) => {
            console.log(err);
            setErrorMessage("Something went wrong. Please try again.");
        }
    });

    // Handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submit
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            await signIn({
                variables: {
                    email: loginFormData.email,
                    password: loginFormData.password
                }
            });
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    return (
        <div className="login absolute bg-slate-900 w-full h-screen flex-center flex-col">
            <img src="src/assets/images/bg-logo.png" />
            <form className="border w-[30rem] p-8" onSubmit={handleOnSubmit}>
                <input
                    onChange={handleOnChange}
                    className="login_email_number m-2 text-white bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="text"
                    placeholder="E-Mail"
                    name="email"
                    value={loginFormData.email}
                    required
                />
                <input
                    onChange={handleOnChange}
                    className="login_password m-2 text-white bg-slate-700 px-4 py-2 w-full rounded-lg outline-none"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginFormData.password}
                    required
                />
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <button
                    type="submit"
                    className={`bg-blue-700 m-2 w-full text-white size-[2.5rem] px-4 py-2 rounded-lg active:scale-[0.85] ${loading ? "opacity-50" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
                {error && <p className="text-red-500">Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default Login;
