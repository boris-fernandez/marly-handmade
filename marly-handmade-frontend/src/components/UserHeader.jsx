// components/UserHeader.jsx
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export default function UserHeader() {

  const { user } = useContext(AuthContext);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">Bienvenido</h2>
      <p className="text-gray-600">{ user ? ` ${user.sub}` : "" }</p>
    </div>
  );
}
