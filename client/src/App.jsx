import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendance');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await axios.post('http://localhost:3001/signin', { name });
      alert('Signed in successfully');
      fetchAttendanceRecords(); // โหลดข้อมูลใหม่หลังจากลงชื่อเข้า
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:3001/signout', { name });
      alert('Signed out successfully');
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <>
      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-blue-500 text-3xl drop-shadow-md'>Attendance <span className='text-orange-500'>System</span></h1>
          <div className='w-7 h-1 rounded-full bg-orange-500'></div>
        </div>
      </div>
      <div className='flex justify-center'>
        <label className='text-blue-500 flex gap-2'>
          Name :
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border rounded-md border-orange-500 pl-2'/>
        </label>
      </div>
      <br />
      <div className='flex justify-center gap-5'>
        <button onClick={handleSignIn} className='shadow-sm text-green-500 bg-green-200 px-5 py-1 rounded-full'>Sign In</button>
        <button onClick={handleSignOut} className='shadow-sm text-rose-500 bg-rose-200 px-5 py-1 rounded-full'>Sign Out</button>
      </div>

      <div className='flex justify-center py-10'>
        <div>
          <h2 className='text-orange-500'>Attendance Records</h2>
          <ul>
            {attendanceRecords.map((record) => (
              <li key={record.id} className='text-white border p-2 rounded-md my-5 shadow-md'>
                <span className='text-orange-500'>{record.name}</span> - <span className='text-green-500'>Sign In</span> - <span className='text-blue-500'>{record.signin_time}</span> - <span className='text-rose-500'>Sign Out</span> - <span className='text-indigo-500'>{record.signout_time || 'Not signed out yet'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;