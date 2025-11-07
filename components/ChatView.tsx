import React, { useState, useEffect, useRef, FormEvent } from 'react';
// FIX: Changed 'import type' to a regular import for consistency and to follow coding guidelines.
import { Chat } from "@google/genai";
import { createChat } from '../services/geminiService';
import Button from './ui/Button';
import Loader from './ui/Loader';
import { ChatMessage } from '../types';

const ChatView: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(createChat());
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
    setHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
        const responseStream = await chat.sendMessageStream({ message: userInput });
        setUserInput('');

        let modelResponse = '';
        for await (const chunk of responseStream) {
            modelResponse += chunk.text;
            setHistory(prev => {
                const newHistory = [...prev];
                const lastMessage = newHistory[newHistory.length - 1];
                if (lastMessage.role === 'model') {
                    lastMessage.parts[0].text = modelResponse;
                    return newHistory;
                } else {
                    return [...newHistory, { role: 'model', parts: [{ text: modelResponse }] }];
                }
            });
        }
    } catch (error) {
        console.error("Chat error:", error);
        setHistory(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I encountered an error." }] }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-2">Agent Assistant</h1>
        <p className="text-text-secondary mb-6">Ask me anything! Powered by gemini-2.5-flash for quick responses.</p>
        <div ref={chatContainerRef} className="flex-1 bg-surface rounded-lg p-4 overflow-y-auto mb-4 space-y-4 border border-border">
            {history.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-text'}`}>
                        {msg.parts[0].text}
                    </div>
                </div>
            ))}
             {isLoading && <div className="flex justify-start"><Loader text="Thinking..."/></div>}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()}>Send</Button>
        </form>
    </div>
  );
};

export default ChatView;