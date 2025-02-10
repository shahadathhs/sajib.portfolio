"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        toast.error(data.error || "Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Message deleted");
        fetchMessages();
      } else {
        toast.error(data.error || "Failed to delete message");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 w-full ">
      <h1 className="text-3xl font-bold mb-4">Contact Messages</h1>
      {loading && <p>Loading messages...</p>}
      {!loading && messages.length === 0 && <p>No messages found.</p>}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <p>
                  <span className="font-bold">Name:</span> {msg.name}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {msg.email}
                </p>
                <p>
                  <span className="font-bold">Message:</span> {msg.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
