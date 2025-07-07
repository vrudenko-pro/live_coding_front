import { useEffect } from "react";
import { refresh } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const Refresh = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return <div>Refresh</div>;
};
