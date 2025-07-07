import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/auth/authSlice";
import { checkIsAuth } from "../../redux/features/auth/authSlice";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [status, isAuth]);

  const handleSubmit = () => {
    try {
      setEmail("");
      setPassword("");
      dispatch(registerUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white">Registration</h1>
      <label className="text-xs text-gray-400 ">
        <div className="text-left mt-3">Email:</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        <div className="text-left mt-3">Password:</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          disabled={!email || !password}
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Sign up
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white"
        >
          Already have account ?
        </Link>
      </div>
    </form>
  );
};
