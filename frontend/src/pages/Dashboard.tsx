import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus } from "lucide-react"

interface Note {
    _id: string;
    title: string
    description?: string
}

interface userDataProps {
    _id: string
    name: string
    email: string
    imgUrl?: string
}

export const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<userDataProps>({ _id: "", name: "", email: "" })
    const [notes, setNotes] = useState<Note[]>([])
    const navigate = useNavigate()

    const handleNotesAndData = async () => {
        try {
            const existingUser = localStorage.getItem('user')
            const token = localStorage.getItem('token')
            if (!existingUser || !token) {
                navigate('/')
            }
            if (existingUser) {
                const user = JSON.parse(existingUser)
                setUserData(user)
                const response = await axios.get(`${BACKEND_URL}/note/${user._id}`, {
                    headers: {
                        Authorization: token
                    }
                })
                setNotes(response.data.notes)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteNote = async (noteId: string) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/')
            }
            await axios.delete(`${BACKEND_URL}/note/${noteId}`, {
                headers: {
                    Authorization: token
                }
            })
            setNotes(notes.filter(note => note._id !== noteId));
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        handleNotesAndData()
    }, [])

    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div className="w-full px-4 py-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="w-full">
                        <div className="flex flex-col gap-4">
                            <div className="border rounded-2xl p-8 shadow">
                                <div className="font-bold text-3xl">
                                    Welcome, {userData.name}!
                                </div>
                                <div className="text-gray-600 text-xl">
                                    {userData.email}
                                </div>
                            </div>

                            <Link
                                className="flex items-center justify-center gap-2 font-semibold w-full rounded-2xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                                to={"/create-note"}
                            >
                                <Plus className="w-5 h-5" />
                                Create Note
                            </Link>

                            <div className="mt-4 p-4 sm:p-8">
                                <div className="text-2xl mb-4">Notes</div>
                                <div className="space-y-2">
                                    {notes.map((note, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between font-semibold text-lg hover:bg-gray-200 border shadow-lg p-4 rounded-xl"
                                        >
                                            <div>
                                                <div className="truncate flex-1">{note.title}</div>
                                                <div className="truncate flex-1 font-normal">{note.description}</div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteNote(note._id)}
                                                className="ml-4 flex-shrink-0 cursor-pointer">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="hidden lg:block w-full">
                        <img
                            src="/right-column.png"
                            className="w-full h-full object-cover rounded-2xl"
                            alt="img"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}