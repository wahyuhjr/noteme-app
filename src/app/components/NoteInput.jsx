"use client";

import {useState} from 'react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export const NoteInput = () => {
    const router = useRouter();
    const [note, setNote] = useState("");
    // const notifyAdd = () => toast("Successfully added!");

    async function handleCreateNote() {
        try{
            const response = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='user@gmail.com')",{
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: note,
              user: "wahyuhidjr11@gmail.com",
              addtitionalData: ""
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add data to the server');
          }

        const data = await response.json();
        router.refresh();
        toast.success('Successfully added!');
        return data;

        }
        catch(error){
            toast.error('Failed to add!');
        }
    }

  return (
    <>
        <div className="font-semibold">Add note</div>
            <div className="flex">
            <input 
                onChange={(e) => setNote(e.target.value)} 
                className='border-2 w-full rounded-lg p-2'
            />
            <button 
                className='bg-blue-600 text-white rounded-lg mx-3'
                onClick={ handleCreateNote }
                >
                Add
            </button>
            </div>
            <Toaster 
                position="top-center"
            />
    </>
  )
}
