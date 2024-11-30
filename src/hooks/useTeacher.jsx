import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getTeacher } from '../actions/authActions'

export const useTeacher = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoadingTeacher, setIsLoadingTeacher] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userResponse = await axios.get("http://127.0.0.1:8000/api/user/");
        dispatch(getTeacher(userResponse.data.user.id))
        setIsTeacher(true);
      } catch (error) {
        console.error(error);
        setIsTeacher(false);
      } finally {
        setIsLoadingTeacher(false);
      }
    };

    checkUserStatus();
  }, []);

  return { isTeacher, isLoadingTeacher };
};

