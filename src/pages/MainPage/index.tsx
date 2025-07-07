import { useEffect } from "react";
import { getMe } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return <div>MainPage</div>;
};
