import React, { useState } from 'react';

export default function NewEventForm() {
  const [eventName, setEventName] = useState('Historic Battle');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const resetState = () => {
    setAddress('');
    setTime('');
    setDate('');
    setEventName('Historic Battle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      name: eventName,
      address,
      date,
      time,
    };
    resetState();
    alert(event);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name :<input value={eventName} onChange={(e) => setEventName(e.target.value)}></input>
        </label>
        <label>
          Address :
          <input required value={address} onChange={(e) => setAddress(e.target.value)}></input>
        </label>
        <label>
          Date and Time :
          <input
            required
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <input
            required
            value={time}
            type="time"
            onChange={(e) => setTime(e.target.value)}
          ></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
