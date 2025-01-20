import React from 'react';
import Appbar from './components/Appbar'; // Adjust path as needed
import Student from './components/Student'
function App() {
  return (
    <div>
      <Appbar />
      <Student/>
      {/* Other components can be added here */}
    </div>
  );
}

export default App;