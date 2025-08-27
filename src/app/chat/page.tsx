"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Message from '@/components/message';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { messageType } from '@/types';
const rooms = ['general', 'random', 'sports', 'news', 'travel', 'food'];

function page() {
    const [message, setMessage] = useState<messageType>({} as messageType);
    const [messages, setMessages] = useState<messageType[]>([]);
    const handleSetMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({ ...message, content: e.target.value } as messageType);
        console.log(message)
    }
    const handleSendMessage = () => {
        if (message && message.content) {
            const newMessage = {
                ...message,
                id: Math.random().toString(36).substring(2, 15),
                username: 'User' + Math.floor(Math.random() * 1000),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessage({ ...message, content: '' } as messageType);
        }
        
    }
    return (
        <main className='flex h-screen'>
            <div className='w-48 h-full p-3 flex flex-col border-gray-300 border-r'>
                <Button className='w-full cursor-pointer' >Create Room</Button>
                <Input className='mt-3' placeholder='Search Room' />
                <div>
                    {
                        rooms.map((room) => (
                            <h1 key={room} className='p-2 mt-3 rounded cursor-pointer hover:bg-accent'># {room}</h1>
                        ))
                    }
                </div>
            </div>
            <section className='flex-1 h-screen py-2 flex flex-col justify-between'>
                <div className='h-12 border-b border-gray-300 flex items-center px-3'>
                    <h1 className='font-bold text-lg'># general</h1>
                </div>
                <div className='h-full overflow-y-auto px-3'>
                    {
                        messages.map((msg) => (
                            <Message
                                key={msg.id}
                                username={msg.username}
                                content={msg.content}
                                timestamp={msg.timestamp}
                            />
                        ))
                    }
                </div>
                <div className="flex px-1 w-full h-20 items-center py-1 gap-2 border-t border-gray-400">
                    <Input type="text" value={message?.content}  placeholder="Type your message here" className='w-full ' onChange={(e) => handleSetMessage(e)} />
                    <Button className='bg-primary text-white  active:opacity-50 ' onClick={() => {handleSendMessage()}}>
                        Send<FiSend size={40} />
                    </Button>
                </div>
            </section>
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