import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Table from "../pages/transaction/compomnents/Table";
import { Dropdown } from "./Dropdown";
import { groupArr } from "../utils/constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { RootState } from "../Redux/store";

const Transaction:React.FC = () => {
  const navigate = useNavigate();

  // redux data
   const reduxData = useSelector((data:RootState) => data.meet);
  const [transactionDatas, setTransactionDatas] = useState(reduxData);

  const [groupby, setGroupby] = useState({});
  // Cookies 
   const cookieM = new Cookies();

  useEffect(() => {
    setTransactionDatas(reduxData);
  }, [reduxData]);

  const [groupVal, setGroupVal] = useState("");

  useEffect(() => {
    groupBy(groupVal);
  }, [transactionDatas]);

  const groupBy = (e) => {
    const gData = [...transactionDatas];

    let groupData = {};
    if (e.target) {
      if (transactionDatas) {
        let field = e.target.value;
        setGroupVal(field);

        if (field === "none") {
          setGroupby(groupData);
        } else {
          gData.forEach((items:any) => {
            const item = items[field]?.value;
            groupData[item] = groupData[item] ?? [];
            groupData[item].push(items);
          });
          setGroupby(groupData);
          // setTransactionData(groupData)
        }
      }
    } else {
      if (e) {
        gData.forEach((items) => {
          const item = items[e]?.value;
          groupData[item] = groupData[item] ?? [];
          groupData[item].push(items);
        });
        setGroupby(groupData);
      }
    }
  };

  const logout = () => {
    // localStorage.removeItem("logindata");
      cookieM.remove("tempdata", { path: "/" });
      window.location.reload();
    navigate("/public/login");
  };

  return (
    <>
      <div className="details">
        <>
          <label>Group By:</label>
          <select
            className="groupby"
            onChange={(e) => {
              groupBy(e);
            }}
          >
            <Dropdown for={groupArr} />
          </select>
        </>

        <div>{transactionDatas && <Table records={transactionDatas} />}</div>

        <button className="createBtn">
          <Link to={"/create"}>Create Transaction</Link>
        </button>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
        <div className="groupDetails">
          {Object.keys(groupby).map((d, index) => {
            if (d !== undefined) {
              return (
                <>
                  <h2>{d}</h2>
                  <Table records={groupby[d]} />
                </>
              );
            } else {
              <></>;
            }
          })}
        </div>
      </div>
    </>
  );
};
export default Transaction;
