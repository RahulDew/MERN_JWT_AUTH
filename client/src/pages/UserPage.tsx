import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";

export default function UserPage() {
  interface UserData {
    userId: string;
    // Add other properties as needed
  }

  const [userData, setUserData] = useState<UserData | undefined>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  return (
    <div>
      You're id is {userData?.userId}
      <br />
      <br />
      <button
        onClick={() => {
          axios.post(
            `${BACKEND_URL}/logout`,
            {},
            {
              withCredentials: true,
            }
          );
        }}
      >
        Logout
      </button>
    </div>
  );
}
