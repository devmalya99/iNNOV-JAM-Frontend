import React, { useState } from 'react';
import { HiCalendar, HiClock, HiPhone } from 'react-icons/hi';


const BookConsultationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to submit the form data
    console.log({
      name,
      email,
      phone,
      date,
      time,
      message,
    });
    // Reset the form fields
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setMessage('');
  };

  return (
    <div>
    <div className=" py-20 h-[calc(100vh-300px)] ">
      <div className="max-w-4xl mx-auto bg-white/15 backdrop-blur-md shadow-lg rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Book a Consultation</h1>
        <p className="text-gray-300 mb-8">
          Get personalized guidance from our experts. Fill out the form below to schedule a one-on-one consultation.
        </p>
        <form onSubmit={handleSubmit} className='text-white'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <label htmlFor="name" className="block  font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block  font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="phone" className="block  font-medium mb-2">
                Phone
              </label>
              <div className="relative">
                <HiPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                <input
                  type="number"
                  id="phone"
                  maxLength={10}
                  placeholder='Enter your phone number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="date" className="block  font-medium mb-2">
                Date
              </label>
              <div className="relative">
                <HiCalendar className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="time" className="block  font-medium mb-2">
                Time
              </label>
              <div className="relative">
                <HiClock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block  font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 text-black"
                rows={2}
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg mt-6 focus:outline-none focus:ring focus:ring-blue-500 text-black"
          >
            Book Consultation
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BookConsultationPage;