import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import './index.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow mt-[80px]">
        <div className="grid lg:grid-cols-3 gap-8">
          <Sidebar />
          <ChatInterface />
        </div>
      </main>
      {/* The modal will be added later */}
    </div>
  );
}

export default App;