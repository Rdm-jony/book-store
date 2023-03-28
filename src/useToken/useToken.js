import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useToken = (email, name) => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        if (email) {
            const user = {
                email,
                name
            }
            fetch(`${process.env.REACT_APP_URL}/user/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)

            })
                .then(res => res.json())
                .then(result => {
                    console.log(result.token)
                    if (result.token) {
                        setToken(result.token)
                        toast.success(`succefully log in ${email}`)
                    }

                })
                .catch(er => console.log(er))
        }
    }, [email, name, token])
    return token;

};

export default useToken;























