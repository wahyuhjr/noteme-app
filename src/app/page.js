import { NoteInput } from './components/NoteInput';
import { NoteCard } from './components/NoteCard';

async function getNotes(){
  const response = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='wahyuhidjr11@gmail.com')",{
   cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function Home() {

  const { items } = await getNotes();

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center mx-auto bg-gray-100 overflow-hidden border-2">
        <div className="w-[500px] bg-white rounded-lg p-4">
          <h1 className="text-center font-bold text-2xl py-5">Notes:</h1>
          <NoteInput />
              {items.map(({id, content}) => {
                return (
                  <NoteCard 
                      key={id} 
                      id={id}
                      content={content}
                    /> 
                )
              })}
        </div>
      </div>
    </div>
  )
}
