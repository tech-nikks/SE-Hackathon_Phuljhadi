import React, { useState, useEffect } from 'react';

const HydrationReminder = () => {
  const [lastReminder, setLastReminder] = useState(
    localStorage.getItem('lastReminder') || 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastReminder = currentTime - lastReminder;
      const reminderInterval = 10 * 60 * 1000; 

      if (timeSinceLastReminder >= reminderInterval) {
        // Show alert
        alert('Remember to drink water!');
        // Update last reminder timestamp
        setLastReminder(currentTime);
        // Update local storage
        localStorage.setItem('lastReminder', currentTime);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [lastReminder]);

  const handleDismiss = () => {
    // Dismiss reminder
    // You can add additional logic here if needed
    alert('Reminder dismissed!');
  };

  return (
    <div>
      <p>Stay hydrated!</p>
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  );
};

export default HydrationReminder;
