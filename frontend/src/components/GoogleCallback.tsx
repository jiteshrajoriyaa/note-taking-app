import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FRONTEND_URL } from "../config"

export const GoogleCallback = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const token = query.get('token')
        const user = query.get('user')

        if (token && user) {
            localStorage.setItem('token', "Bearer " + token)
            localStorage.setItem('user', user)
            navigate(`${FRONTEND_URL}/dashboard`)
        } else {
            alert('login failed')
            navigate(`${FRONTEND_URL}/`)
        }
    }, [location, navigate])

    return <p>Logging in...</p>;

}

