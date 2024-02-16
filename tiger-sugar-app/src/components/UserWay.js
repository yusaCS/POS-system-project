import React, { useEffect } from 'react';

const UserWay = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//cdn.userway.org/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default UserWay;
