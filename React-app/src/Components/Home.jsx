// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Components/Home.css"; 

const Home = () => {
  return (
    <div className="home_Section">
      <header>
        <nav>
          <ul>
            <li id="topic">ZenAlert</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sos">SOS Help</Link></li>
            <li><Link to="/assessment">Assessment</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/mood">Mood Track</Link></li>
            <li><Link to="/news">News</Link></li> 
            <li><Link to="/tasks">Task Manager</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Welcome to Emergency and Mental Wellbeing</h2>
        <div className="buttons">
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/forgot-password"><button>Forgot Password</button></Link>
          <Link to="/chatbot"><button>Try Chatbot</button></Link>
          <Link to="/mood"><button>Track Mood</button></Link>
        </div>
      </main>

      <footer>
        <p>© 2025 Mental Wellbeing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
