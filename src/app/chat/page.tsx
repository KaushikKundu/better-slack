"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Message from '@/components/message';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { messageType, UserType } from '@/types';
import socket from '@/lib/socket';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import RoomModal from '@/components/modal';
const initialRooms = ['General', 'Random', 'Important', 'News'];

function page() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<messageType[]>([]);
    const [room, setRoom] = useState<string>('general');
    const [rooms, setRooms] = useState<string[]>(initialRooms);
    const [searchRoomInput, setSearchRoomInput] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState<UserType | null>();


    const filteredRooms = useMemo(() => {
        if (searchRoomInput.trim() == '') return rooms;
        return rooms.filter(room =>
            room.toLowerCase().includes(searchRoomInput.toLowerCase())
        )
    }, [searchRoomInput, rooms])

    const handleSendMessage = async () => {
        if (input.trim() === '') return;
        const newMessage = {
            content: input,
            room,
            userId: user?.id
        }
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            });

            const savedMessage = await res.json();
            console.log(savedMessage)
            socket.emit('roomMessage', {
                room,
                msg: {
                    userId: savedMessage.userId,
                    username: savedMessage.user.name,
                    content: savedMessage.content,
                    timestamp: new Date(savedMessage.timestamp).toLocaleTimeString(),
                },
            })
        } catch (err: any) {
            console.error(err);
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
        async function fetchUser() {
            const res = await fetch("/api/user");
            const data = await res.json();
            setUser(data);
        }
        fetchUser();
        socket.emit('joinRoom', room);
        return () => {
            socket.emit('leaveRoom', room);
        }
    }, []);
    
    useEffect(() => {
        socket.on('roomMessage', (msg: messageType) => {
            setMessages((prev) => [...prev, msg]);
        })
        return () => {
            socket.off('roomMessage');
        }
    }, [socket]);
    return (
        <main className='flex h-screen'>
            <div className='w-48 h-full p-3 flex flex-col border-gray-300 border-r bg-accent'>
                <div className='text-2xl font-bold p-2  mb-2 flex jjustify-center items-center gap-1'>
                    <IoChatbubbleEllipsesOutline />
                    Chat App</div>
                <Button className='w-full cursor-pointer' onClick={() => setModalOpen(true)}>Create Room</Button>
                <Input className='mt-3' placeholder='Search Room' onChange={e => setSearchRoomInput(e.target.value)} />
                <div>
                    {
                        filteredRooms.map((room) => (
                            <h1 key={room} className='p-2 mt-3 rounded cursor-pointer hover:bg-white'
                                onClick={() =>
                                    handleJoinRoom(room)
                                } ># {room} </h1>
                        ))
                    }
                </div>
            </div>
            <RoomModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={(newRoom) => setRooms([...rooms, newRoom])}
            />
            <section className='flex-1 h-screen py-2 flex flex-col justify-between'>
                <div className='h-12 border-b border-gray-300 flex items-center px-3'>
                    <h1 className='font-bold text-lg'># {room} </h1>
                </div>
                <div className='h-full overflow-y-auto overflow-x-hidden px-3 flex flex-col py-2'>
                    {
                        messages.length ? messages.map((msg) => (
                            <Message
                                key={msg.createdAt}
                                username={msg.username}
                                content={msg.content}
                                createdAt={new Date(msg.createdAt).toLocaleTimeString()}
                                isOwnMessage={msg.userId === user?.id}
                                userId={msg.userId}
                            />

                        )) : (
                            <div className="w-full my-auto">
                                <p className='text-center text-xl text-gray-700'>No messages yet. Start the conversation!</p>
                            </div>
                        )
                    }
                </div>
                <div className="flex px-1 w-full h-20 items-center py-1 gap-2">
                    <Input type="text" value={input} placeholder="Type your input here" className='w-full bg-primary/50' onChange={(e) => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key == "Enter") {
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
            <section className='w-64 h-screen p-3 border-l border-gray-300 flex flex-col bg-accent'>
                <div className="flex-1">
                    <h1 className='font-semibold text-xl'>Room Info</h1>
                    <p className='mt-3'>This is the general room. Feel free to chat about anything!</p>
                    <h2 className=' my-5 text-lg'>Members</h2>
                    <div className='overflow-y-auto'>
                        {messages.map((user) => (
                            <div className='flex items-center justify-start mb-3' key={user.createdAt}>
                                <Image
                                    src="/profile.jpg"
                                    alt="profilepic"
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