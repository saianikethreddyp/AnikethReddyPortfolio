import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <div className="bg-primary min-h-screen text-text selection:bg-accent selection:text-primary overflow-x-hidden">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <ChatBot />
        <footer className="text-center py-8 text-muted text-sm">
          <p>© {new Date().getFullYear()} Sai Aniketh Reddy Papayagari. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
