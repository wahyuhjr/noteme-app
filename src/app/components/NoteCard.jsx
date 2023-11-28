"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const NoteCard = ({id, content}) => {
    const router = useRouter();
    const [currentContent, setCurrentContent] = useState(content);
    const [isEditing, setIsEditing] = useState(false);

    async function handleDelete() {
        try{
            await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
        {
            method: "DELETE",
        });
        toast.success('Successfully deleted!');
        router.refresh();
        }
        catch(error){
            toast.error('Failed to delete!');
        }
    }

    async function handleUpdate() {
        setIsEditing(false);
        
        try{
            await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: currentContent,
            }),
        });
        toast.success('Successfully updated!');
        router.refresh();
        }
        catch(error){
            toast.error('Failed to update!');
        }
    }

  return (
    <>
        <div className='flex justify-between gap-4 mt-5 border-2 rounded-lg p-2'>
            <div>
                {isEditing ? (
                    <input 
                        value={currentContent}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        className='focus:outline-none'
                    />
                ) : (
                    <div>{currentContent}</div>
                )}
            </div>
            <div className='space-x-2'>
            {isEditing ? (
                <button 
                onClick={handleUpdate}
                className='bg-green-600 text-white text-sm rounded-lg'>
                Update
            </button>
            ) : (
                <button 
                onClick={() => setIsEditing(true)}
                className='bg-blue-400 text-white text-sm rounded-lg'>
                Edit
            </button>
            )}
            <button 
                onClick={handleDelete}
                className='bg-red-600 text-white text-sm rounded-lg'>
                Delete
            </button>
            </div>
        </div>
    </>
    )
}
