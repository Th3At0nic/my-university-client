export type TError = {
  data: {
    errorSource: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse = {
  data: {
    code: string;
    createdAt: string;
    endMonth: string;
    name: string;
    startMonth: string;
    updatedAt: string;
    year: string;
    __v: number;
    _id: string;
  };
  message: string;
  success: boolean;
  error?: TError;
};
