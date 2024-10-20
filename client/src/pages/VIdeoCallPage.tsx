import { useSocket } from "@/context/ServerContext";
import useAuth from "@/hooks/useAuth";
import { useCallback, useEffect } from "react";

function VideoCallPage() {
  const { user } = useAuth();
  const socket = useSocket();

  const handleUserJoined = useCallback((data: any) => {
    const { user, socketUserId, message } = data;
    console.log(message);
    console.log(`${user.email} New User joined: ${socketUserId}`);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <>
      <h1 className="text-3xl font-bold">Video Call Page</h1>

      <p>{JSON.stringify(user)}</p>
    </>
  );
}

export default VideoCallPage;
