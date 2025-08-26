import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Message from '@/components/message';
import Image from 'next/image';
const rooms = ['general', 'random', 'sports', 'news', 'travel', 'food'];
const messages = [
    {
        id: 1,
        username: 'John',
        content: 'Hello, everyone!',
        timestamp: '10:00 AM'
    },
    {
        id: 2,
        username: 'Alice',
        content: 'Hi, John! How are you?',
        timestamp: '10:01 AM'
    }
]
function page() {
    return (
        <main className='flex h-screen'>
            <div className='w-48  h-screen p-3 flex flex-col border-gray-300 border-r'>
                <Button className='w-full cursor-pointer' >Create Room</Button>
                <Input className='mt-3 ' placeholder='Search Room' />
                <div>
                    {
                        rooms.map((room) => (
                            <h1 key={room} className='p-2 mt-3 rounded cursor-pointer '># {room}</h1>
                        ))
                    }
                </div>
            </div>
            <div className='flex-1 h-screen '>
                <div className='h-16 border-b border-gray-300 flex items-center px-3'>
                    <h1 className='font-bold text-lg'># general</h1>
                </div>
                <div className='h-[calc(100vh-8rem)] overflow-y-auto px-3'>
                    {
                        messages.map((msg) => (
                            <Message
                                key={msg.id}
                                id={msg.id}
                                username={msg.username}
                                content={msg.content}
                                timestamp={msg.timestamp}
                            />
                        ))
                    }
                </div>
                <Textarea placeholder='Enter your text ' />
            </div>
            <section className='w-64 h-screen p-3 border-l border-gray-300 flex flex-col'>
                <div className="flex-1">
                    <h1 className='font-bold text-2xl'>Room Info</h1>
                    <p className='mt-3'>This is the general room. Feel free to chat about anything!</p>
                    <h2 className='font-bold my-5 text-lg'>Members</h2>
                    <div className='overflow-y-auto'>
                        {messages.map((user) => (
                            <div key={user.id} className='flex items-center justify-start mb-3'>
                                <Image
                                    src="/profile.jpg"
                                    alt={user.username}
                                    width={40}
                                    height={40}
                                    className='rounded-full mr-2'
                                />
                                <h1 className='rounded cursor-pointer text-lg tracking-wide'>
                                    {user.username}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
                <Button className='w-full mt-auto bg-white text-red-600 border-2 border-red-600 cursor-pointer hover:bg-red-600 hover:text-white'>
                    Leave Room
                </Button>
            </section>


        </main>
    )
}

export default page;