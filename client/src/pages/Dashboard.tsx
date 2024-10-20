import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
// import { useSocket } from "@/context/ServerContext";
// import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function Dashboard() {
  // const [roomId, setRoomId] = useState<string>("");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // const socket = useSocket();

  const handleLogout = async () => {
    logout();
  };

  // const handleRoomJoin = useCallback(
  //   (e: React.MouseEvent | React.KeyboardEvent) => {
  //     e.preventDefault();
  //     socket.emit("room:join", {
  //       roomId,
  //       user,
  //     });
  //   },
  //   [roomId, socket, user?.email]
  // );

  // const handleJoinRoom = useCallback(
  //   (data: any) => {
  //     console.log(data);
  //     navigate(`/room/${data?.roomId}`);
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   socket.on("room:join", handleJoinRoom);
  //   return () => {
  //     socket.off("room:join", handleJoinRoom);
  //   };
  // }, [socket, handleJoinRoom]);

  const newId = uuidV4();
  console.log("id", newId);

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="font-bold text-3xl">Lobby</h1>
      <form>
        <p>Join a room to start a video call</p>
        {/* <input
          type="text"
          placeholder="Enter room id"
          id="room"
          onChange={(e) => setRoomId(e.target.value)}
        /> */}
        <Button onClick={() => {}}>join the room</Button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <Button
        variant={"default"}
        onClick={() => navigate(`/document/${newId}`)}
      >
        Create a document
      </Button>
      <br />
      <br />
      <p>{JSON.stringify(user)}</p>
      <Button variant={"secondary"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
