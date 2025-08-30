"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Message from '@/components/message';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { messageType } from '@/types';
import socket from '@/lib/socket';
const rooms = ['general', 'random', 'sports', 'news', 'travel', 'food'];

function page() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<messageType[]>([]);
    const [room, setRoom] = useState<string>('general');
    const [searchRoomInput, setSearchRoomInput] = useState<string>('');
    const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`);

    const filteredRooms = useMemo(() => {
        if(searchRoomInput.trim() == '') return rooms;
        return rooms.filter(room => 
            room.toLowerCase().includes(searchRoomInput.toLowerCase())
        )
    },[searchRoomInput])

    const handleSendMessage = () => {
        if (input.trim() === '') return;
        const newMessage = {
            username: 'User',
            content: input,
            timestamp: new Date().toLocaleTimeString(),
            userId
        }
        socket.emit('roomMessage', { room, msg: newMessage });
        setInput('');
    };

    const handleJoinRoom = (newRoom: string) => {
        socket.emit('leaveRoom', room);
        socket.emit('joinRoom', newRoom);
        setMessages([]);
        setRoom(newRoom);
    }
    useEffect(() => {
        socket.emit('joinRoom',room);
        return () => {
            socket.emit('leaveRoom',room);
        }
    },[]);

    useEffect(() => {
        socket.on('roomMessage', (msg: messageType) => {
            setMessages((prev) => [...prev, msg]);
        })
        console.log(messages);
        return () => {
            socket.off('roomMessage');
        }
    }, [socket]);
    console.log(filteredRooms)
    return (
        <main className='flex h-screen'>
            <div className='w-48 h-full p-3 flex flex-col border-gray-300 border-r'>
                <Button className='w-full cursor-pointer' >Create Room</Button>
                <Input className='mt-3' placeholder='Search Room' onChange={e => setSearchRoomInput(e.target.value)}/>
                <div>
                    {
                        filteredRooms.map((room) => (
                            <h1 key={room} className='p-2 mt-3 rounded cursor-pointer hover:bg-accent'
                                onClick={() =>
                                    handleJoinRoom(room)
                                } ># {room} </h1>
                        ))
                    }
                </div>
            </div>
            <section className='flex-1 h-screen py-2 flex flex-col justify-between'>
                <div className='h-12 border-b border-gray-300 flex items-center px-3'>
                    <h1 className='font-bold text-lg'># {room} </h1>
                </div>
                <div className='h-full overflow-y-auto overflow-x-hidden px-3 flex flex-col items-end py-2'>
                    {
                        messages.map((msg) => (
                            <Message
                                key={msg.timestamp}
                                username={msg.username}
                                content={msg.content}
                                timestamp={msg.timestamp}
                                isOwnMessage={msg.userId == userId}
                                userId={userId}
                            />
                        ))
                    }
                </div>
                <div className="flex px-1 w-full h-20 items-center py-1 gap-2 border-t border-gray-400">
                    <Input type="text" value={input} placeholder="Type your input here" className='w-full ' onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={e => {
                        if(e.key == "Enter"){
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    />
                    <Button className='bg-primary text-white  active:opacity-50 ' onClick={() => { handleSendMessage() }}>
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
                            <div className='flex items-center justify-start mb-3' key={user.userId}>
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
                    Leave Server
                </Button>
            </section>


        </main >
    )
}

export default page;