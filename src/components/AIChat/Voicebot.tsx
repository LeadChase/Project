'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X } from 'lucide-react';
import { Message } from '../../types/index';

interface VoicebotProps {
  onClose: () => void;
}

export const Voicebot: React.FC<VoicebotProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

    return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Voice Assistant</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
                  </div>
        ))}
        <div ref={messagesEndRef} />
                </div>

      <div className="p-4 border-t flex justify-center space-x-4">
            <button
              onClick={toggleListening}
          className={`p-3 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-gray-200'
          }`}
            >
              {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
              ) : (
            <Mic className="w-6 h-6 text-gray-600" />
              )}
            </button>
                <button
          onClick={toggleSpeaking}
          className={`p-3 rounded-full ${
            isSpeaking ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        >
          <Volume2
            className={`w-6 h-6 ${
              isSpeaking ? 'text-white' : 'text-gray-600'
            }`}
          />
                </button>
      </div>
    </div>
  );
};