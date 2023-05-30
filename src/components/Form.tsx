import "../assets/styles/transaction.css";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  MonthArr,
  TransactionTypeArr,
  AccountArr,
  MAX_FILE_SIZE,
  validFileExtensions,
} from "../utils/constant";
import { Dropdown } from "./Dropdown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { transactionErrorsType } from "../interface/app_interface";
import {
  addTransaction,
  updateTransaction,
} from "../Redux/ducks/transactionSlice";
import { transactionType } from "../interface/app_interface";
let info = {
  // monthYear: {},
  // transactionDate: {},
  // transactionType: {},
  // fromAccount: {},
  // toAccount: {},
  // transactionAmount: {},
  // receipt: {},
  // notes: {},
  // id: "",

  monthYear: {
    value: "",
  },
  transactionDate: {
    value: "",
  },
  transactionType: {
    value: "",
  },
  fromAccount: {
    value: "",
  },
  toAccount: {
    value: "",
  },
  transactionAmount: {
    value: 0,
  },
  receipt: {
    value: "",
  },
  notes: {
    value: "",
  },
  id: "",
};

const TransactionForm = () => {
  const { id } = useParams();
  // const id: string | undefined = id1;
  // const index = id - 1;

  // redux data.....
  const reduxData = useSelector((data: RootState) => data.meet);
  const dispatch = useDispatch();

  const [transactionData, setTransactionData] =
    useState<transactionType[]>(reduxData);

  const updateData: any = [...transactionData];

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<transactionType>(info);

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    transactionDate: yup.string().required("Transaction Date is required!!"),
    monthYear: yup.string().required("month year is required!!"),
    transactionType: yup.string().required("transaction type is required!!"),
    fromAccount: yup
      .string()
      // .notOneOf([yup.ref("toAccount"), null], "To Account is  matched!!")
      .required("account is required!!"),
    toAccount: yup
      .string()
      .notOneOf([yup.ref("fromAccount"), null], "From Account is  matched!!")
      .required("account is required!!"),
    transactionAmount: yup
      .number()
      .integer()
      .positive()
      .min(2, "minimum amount should be 10")
      .required()
      .typeError("amount is required!!"),
    notes: yup
      .string()
      .min(3)
      .trim()
      .max(250)
      .required()
      .typeError("notes is required!!"),
    receipt: yup.mixed().test({
      name: "is-sku",
      skipAbsent: true,
      test(value: yup.AnyObject | undefined, error) {
        if (value === undefined || value === null || value.length === 0) {
          return error.createError({ message: "image is required!!!" });
        } else {
          if (typeof value === "string") {
            return true;
          } else {
            if (!validFileExtensions.includes(value[0].type)) {
              return error.createError({
                message: "image type must be jpeg,png,jpg or svg..",
              });
            }
          }
          if (typeof value === "string") {
            return true;
          } else {
            if (value[0]["size"] > MAX_FILE_SIZE) {
              return error.createError({
                message: "image must less than 10kb",
              });
            }
          }
        }
        return true;
      },
    }),
  });
  let dummy = updateData.filter((value: transactionType) => {
    if (Number(value["id"])) {
      return Number(value["id"]) === Number(id);
    }
  });

  let udata: any = {};

  for (let a in dummy[0]) {
    if (dummy[0][a].value !== undefined) {
      udata[a] = dummy[0][a].value;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<transactionErrorsType | transactionType>({
    resolver: yupResolver(formSchema),
    defaultValues: udata,
  });
  // ......

  useEffect(() => {
    for (const key in updateData) {
      if (key && Number(updateData[key]?.id) === Number(id)) {
        setData(updateData[key]);
        break;
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const removeImage = () => {
    setData((prev: any) => ({
      ...prev,
      receipt: "",
    }));
  };
  const onSubmit = (e: transactionType | transactionErrorsType) => {
    let {
      monthYear,
      transactionDate,
      transactionType,
      fromAccount,
      toAccount,
      transactionAmount,
      receipt,
      notes,
    } = e;

    setData((prev: any) => ({
      ...prev,
      monthYear: {
        value: monthYear,
      },
      transactionDate: {
        value: transactionDate,
      },
      transactionType: {
        value: transactionType,
      },
      fromAccount: {
        value: fromAccount,
      },
      toAccount: {
        value: toAccount,
      },
      transactionAmount: {
        value: transactionAmount,
      },
      receipt: {
        value: data.receipt,
      },
      notes: {
        value: notes,
      },
    }));

    setData(data); // context data
    setSubmit(true);
  };
  const handleChange = (e: any) => {
    let receiptPhoto: any;
    let file = e.target.files[0];
    let freader = new FileReader();
    freader.readAsDataURL(file);
    freader.addEventListener("load", () => {
      receiptPhoto = freader.result;

      setData((prev) => ({
        ...prev,
        receipt: {
          ...prev.receipt,
          value: receiptPhoto,
        },
      }));
    });
  };

  useEffect(() => {
    if (submit) {
      if (transactionData.length !== 0) {
        const retrivedata = [...transactionData];
        if (id) {
          dispatch(updateTransaction({ updateData: data, id })); //dispatch
        } else {
          const prevDataIndex = Object.keys(retrivedata).length - 1;
          const prevId = retrivedata[prevDataIndex]["id"];
          data["id"] = Number(Number(prevId) + 1).toString();
          dispatch(addTransaction({ data })); //dispatch
        }
      } else {
        data["id"] = Number(1).toString();
        // transactionData.push(data);   //secong approach
        setTransactionData((prev: any) => [...prev, data]);
        dispatch(addTransaction({ data })); //dispatch
      }
      navigate("/transaction");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <label className="label">Transaction Date:</label>
          <div className="input">
            <input
              type="date"
              id="date"
              // name="transactionDate"
              {...register("transactionDate")}
              // value={data?.transactionDate?.value}

              onClick={() => {
                const newdate = new Date();
                var year = newdate.getFullYear();
                var month = newdate.getMonth() + 1;
                var day = newdate.getDate();
                if (month < 10) {
                  month = Number("0" + month);
                }
                if (day < 10) {
                  day = Number("0" + day);
                }

                var limit = `${year}-${month}-${day}`;

                const date = document.getElementById("date");
                if (date !== null) {
                  date.setAttribute("max", limit);
                }
              }}
            ></input>
            <span>{errors.transactionDate?.message}</span>
          </div>
          <br></br>
          <label className="label">Month Year:</label>

          <div className="input">
            <select
              // name="monthYear"
              {...register("monthYear")}
              // value={data?.monthYear?.value}
            >
              <option value="" selected>
                Select
              </option>

              {MonthArr.map((month) => {
                return (
                  <option value={`${month} 2023`}>{`${month} 2023`}</option>
                );
              })}
            </select>
            <span>{errors.monthYear?.message}</span>
          </div>
          <br></br>
          <label className="label">Transaction Type:</label>
          <div className="input">
            <select
              // name="transactionType"
              {...register("transactionType")}
              // value={data?.transactionType?.value}
            >
              <option value="" selected>
                Select
              </option>
              <Dropdown for={TransactionTypeArr} />
            </select>
            <span>{errors.transactionType?.message}</span>
          </div>
          <br></br>

          <label className="label">From Account:</label>
          <div className="input">
            <select
              // name="fromAccount"
              {...register("fromAccount")}
              // value={data?.fromAccount?.value}
            >
              <option value="" selected>
                Select
              </option>
              <Dropdown for={AccountArr} />
            </select>
            <span>{errors.fromAccount?.message}</span>
          </div>
          <br></br>

          <label className="label">To Account: </label>
          <div className="input">
            <select
              // name="toAccount"
              {...register("toAccount")}
              // value={data?.toAccount?.value}
            >
              <option value="" selected>
                Select
              </option>
              <Dropdown for={AccountArr} />
            </select>
            <span>{errors.toAccount?.message}</span>
          </div>
          <br></br>
          <label className="label">Amount:</label>
          <div className="input">
            <input
              type="text"
              // name="transactionAmount"
              {...register("transactionAmount")}
              // value={data?.transactionAmount?.value}
            ></input>
            <span>{errors.transactionAmount?.message?.toString()}</span>
          </div>
          <br></br>
          <label className="label">Receipt:</label>
          <div className="input">
            {data.receipt?.value ? (
              <>
                <img src={data.receipt?.value} width={50} height={50} alt="" />
                <span onClick={removeImage} className="cross">
                  X
                </span>
              </>
            ) : (
              <>
                <input
                  type="file"
                  // name="receipt"
                  alt="Receipt is not found"
                  {...register("receipt", { onChange: handleChange })}
                  // value={data?.receipt?.value}
                ></input>
              </>
            )}

            <span>{errors.receipt?.message}</span>
          </div>
          <br></br>
          <label className="label">Notes:</label>
          <div className="input">
            <textarea
              cols={30}
              rows={6}
              // name="notes"
              {...register("notes")}
              // value={data?.notes?.value}
            ></textarea>
            <span>{errors.notes?.message}</span>
          </div>

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <Link to={`/transaction`} className="showTrn">
            Show Transaction
          </Link>
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
