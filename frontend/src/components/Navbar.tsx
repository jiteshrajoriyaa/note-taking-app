import { useNavigate } from "react-router-dom"
import Button from "./Button"

export const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () =>{
        try{
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/')
        }catch(e: any){
            console.error(e)
        }
    }
    return < div className="w-screen p-6 flex justify-between items-center shadow border font-bold text-xl" >
        <div className="flex gap-2 ">
            <img src="./top.png" alt="" />
            <p>Dashboard</p>
        </div>
        <Button
            onClick={handleLogout}
            text="Logout"
        />
    </div >
}