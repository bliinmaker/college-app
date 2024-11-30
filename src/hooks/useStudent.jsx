// В файле useAuth.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getStudent } from '../actions/authActions'

export const useStudent = () => {
  const dispatch = useDispatch()
  const [isStudent, setIsStudent] = useState(false);
  const [isLoadingStudent, setIsLoadingStudent] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userResponse = await axios.get("http://127.0.0.1:8000/api/user/");
        // if (userResponse) {
        //   let data = await axios.get(
        //     `http://127.0.0.1:8000/api/user/${userResponse.data.user.id}/student/`
        //   );
          
          dispatch(getStudent(userResponse.data.user.id))
          setIsStudent(true);
        // }
      } catch (error) {
        console.error(error);
        setIsStudent(false);
      } finally {
        setIsLoadingStudent(false);
      }
    };

    checkUserStatus();
  }, []);

  return { isStudent, isLoadingStudent };
};

