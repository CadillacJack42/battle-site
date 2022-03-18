import React from 'react';
import NewEventForm from './NewEventForm';
import Event from './Event';

export default function Events() {
  return (
    <div className="map-container">
      <h1>New Events Scheduler</h1>
      <NewEventForm />
      <Event />
    </div>
  );
}
