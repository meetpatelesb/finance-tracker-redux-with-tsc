
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatter } from "../utils/helper";
import * as React from 'react';
import { RootState } from "../Redux/store";
const View = () => {
  const { id } = useParams();
  // params give id no. but we need index to fetch data
  const index:number = Number(id) - 1;
  // redux data.....
  const reduxData = useSelector((data:RootState) => data.meet);
  const retrivedata = reduxData;
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <h2>Transaction</h2>
          {[retrivedata[index]].map((data, index) => (
            <>
              <div>
                <div>
                  <label>Date of your transaction:</label>
                  <span>{data.transactionDate.value}</span>
                </div>
                <div>
                  <label>Month year:</label>
                  <span>{data.monthYear.value}</span>
                </div>
                <div>
                  <label>Amount:</label>
                  <span>{formatter.format(data.transactionAmount.value)}</span>
                </div>
                <div>
                  <label>Transaction Type:</label>
                  <span>{data.transactionType.value}</span>
                </div>
                <div>
                  <label>From Acoount:</label>
                  <span>{data.fromAccount.value}</span>
                </div>
                <div>
                  <label>To Acoount:</label>
                  <span>{data.toAccount.value}</span>
                </div>
                <div>
                  <div>
                    <label>Receipt:</label>
                    <img
                      src={data.receipt.value}
                      width={70}
                      height={70}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label>Notes:</label>
                    <span>{data.notes.value}</span>
                  </div>
                  <div></div>
                </div>
              </div>
            </>
          ))}
          <div>
            <Link
              className="button-30 ViewBtn"
              to={`/transaction`}
             
            >
              View Transaction
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
