const successReposponse = (payload: any) => {
  return { status: 1, payload: payload };
};

const failureReponse = (errCode: string, errMsg: string) => {
  return { status: 0, ERRCODE: errCode, errMsg: errMsg };
};

export { successReposponse, failureReponse };
