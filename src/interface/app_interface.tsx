export interface transactionType {
  monthYear: {
    value: string
  };
  transactionDate: {
    value: string
  };
  transactionType: {
    value: string
  };
  fromAccount: {
    value: string
  };
  toAccount: {
    value: string
  };
  transactionAmount: {
    value: number
  };
  receipt: {
    value: string
  };
  notes: {
    value: string
  };
  id:number | string| undefined
}


export interface regDataType{
 
    name: string
    id: string
    email: string
    password: string
    cpassword: string
}

export interface paginationType {
  currentPage: number;
  pages: number;
  nThPage: number;
  setCurrentPage: number;
}

export interface errorsType{
  name:string
  email:string
  password:string
  cpassword:string
}

export interface loginErrorsType {
 
  email: string;
  password: string;
 
}


export interface transactionErrorsType {
  monthYear:string
  transactionDate:string
  transactionType:string
  fromAccount:string
  toAccount:string
  transactionAmount:string
  receipt:string
  notes:string
}
