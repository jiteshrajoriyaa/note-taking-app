import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); 
        return;
      }

      await axios.post(
        `${BACKEND_URL}/note`,
        { title, description },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/dashboard"); 
    } catch (error) {
      console.error(error);
      alert("Failed to create note");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Note</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
};
