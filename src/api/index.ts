import request from "../unitls/request";

type User = {
  username: string;
  password: string;
};

// 用户-----登录
export const loginAPI = (userlogin: User) =>
  request({
    url: "/api/login",
    method: "POST",
    data: {
      user_name: userlogin.username,
      user_pwd: userlogin.password,
    },
  });

// 用户-----注册
export const registerAPI = (useReg: User) =>
  request({
    url: "/api/register",
    method: "POST",
    data: {
      user_name: useReg.username,
      user_pwd: useReg.password,
    },
  });

// 用户信息-----获取用户信息
export const getUserInfoAPI = () =>
  request({
    url: "/my/getinfo",
  });
