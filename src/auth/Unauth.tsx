import { Route,Routes,Navigate,useNavigate } from 'react-router-dom';
import Registration from '../components/Registration';
import Login from '../components/Login';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';

const Unauth = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("tempdata");
  useEffect(()=>{
    if (token) {
      navigate("/transaction");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      {!token && (
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default Unauth;



