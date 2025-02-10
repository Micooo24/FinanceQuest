import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context to hold the global volume state
const VolumeContext = createContext();

// Custom hook to use the VolumeContext
export const useVolume = () => {
  return useContext(VolumeContext);
};

export const VolumeProvider = ({ children }) => {
  // Initialize the volume from localStorage if available
  const storedVolume = localStorage.getItem("volume");
  const [volume, setVolume] = useState(storedVolume ? parseFloat(storedVolume) : 1);

  // Update volume in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume]);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};
