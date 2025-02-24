"use client";

import { useEffect } from "react";
import { IntercomProvider, useIntercom } from "react-use-intercom";

export function Intercom({ name, email }) {
  return (
    <IntercomProvider appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID}>
      <IntercomInstance name={name} email={email} />
    </IntercomProvider>
  );
}

function IntercomInstance({ name, email }) {
  const { boot, shutdown } = useIntercom();

  useEffect(() => {
    // Initialize Intercom on component mount
    boot({
      createdAt: Math.floor(Date.now() / 1000), // Unix timestamp (in seconds) e.g. 1704067200
      // alignment: "left",
      name,
      email,
      // Add any other options you need, such as user data
    });
    console.log("Boot intercom! ☎️");

    // Clean up Intercom on component unmount
    return cleanup;

    function cleanup() {
      shutdown();
      console.log("Shutdown intercom! 📴");
    }
  }, [boot, email, name, shutdown]);

  return;
}
