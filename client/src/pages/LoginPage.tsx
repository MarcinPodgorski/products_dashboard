import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    const handleUserData = (event: any) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:5001/auth/login", userData)
            .then((res) => {
                if (res.status === 200) {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage("Błędny login lub hasło")
            });
    };
    return (
        <>
            (
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <h3 className="text-3xl font-bold mb-10">Zaloguj się</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                        placeholder='email'
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleUserData}
                        required
                    />
                    <input
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                        placeholder='Hasło'
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleUserData}
                        required
                    />
                    <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" type="submit">
                        Zaloguj
                    </button>
                </form>
                {errorMessage && <p className="text-xl text-red-600">{errorMessage}</p>}
            </div>

            )
        </>

    );
}
