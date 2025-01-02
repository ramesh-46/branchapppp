import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Branches from './components/Branches';
import ManageBranch from './components/ManageBranch';
import LoginForm from './components/LoginForm';
import Help from './components/Help';
import './App.css';
import ParentComponent from './components/ParentComponent'; // Path from App.js to the components folder.

// ... inside the App component's JSX
<ParentComponent />
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        return storedLogin ? JSON.parse(storedLogin) : false;
    });
    const [branches, setBranches] = useState(() => {
        const storedBranches = localStorage.getItem('branches');
        return storedBranches ? JSON.parse(storedBranches) : [];
    });

    useEffect(() => {
        localStorage.setItem('branches', JSON.stringify(branches));
    }, [branches]);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const handleLogin = (username, password) => {
        if (username === 'ramesh' && password === '1234') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleAddBranch = (newBranch) => {
        setBranches(prevBranches => [...prevBranches, newBranch]);
    };

    const handleEditBranch = (updatedBranch, indexToUpdate) => {
        setBranches(prevBranches => {
            const newBranches = [...prevBranches];
            newBranches[indexToUpdate] = updatedBranch;
            return newBranches;
        });
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />} />
                <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} >
                    <Route index element={<HomePage />} />
                    <Route path="branches" element={<Branches branches={branches} onAddBranch={handleAddBranch} onEditBranch={handleEditBranch} />} />
                    <Route path="manage-branch/:branchId?" element={<ManageBranch onAddBranch={handleAddBranch} branches={branches} onEditBranch={handleEditBranch} />} />
                    <Route path="help" element={<Help />} />
                </Route>
            </Routes>
        </Router>
    );
}

function Layout() {
    return (
        <div className="app-container">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default App;