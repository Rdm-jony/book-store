import { useEffect, useState } from "react"

const useAdminToken = (email) => {
    const [isAdmin, setIsAdmin] = useState(null)
    const [adminLoader, setAdminLoader] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_URL}/isAdmin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.isAdmin) {
                        setIsAdmin(data?.isAdmin)
                    }
                    setAdminLoader(false)
                })
                .catch(er => console.log(er))

        }



    }, [email, adminLoader])
    return [isAdmin, adminLoader];

}
export default useAdminToken;