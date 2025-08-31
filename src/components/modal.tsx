import React, { useState } from "react";
interface roomModalProps {
    isOpen:boolean;
    onClose:() => void,
    onSubmit:(roomName:string) => void
}
export default function RoomModal({ isOpen, onClose, onSubmit }:roomModalProps) {
  const [roomName, setRoomName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim() === "") return;
    onSubmit(roomName);
    setRoomName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          Enter Room Name
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name"
            className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleSubmit}
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
