import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

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
            navigate('/dashboard')
        } else {
            alert('login failed')
            navigate('/')
        }
    }, [location, navigate])

    return <p>Logging in...</p>;

}

