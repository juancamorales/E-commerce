import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  UPDATE_ROLL,
  POST_BILL,
  POST_USER,
  ADDSHOPPING,
  GET_ALL_FOODS,
  GET_FILTER_FOODS,
  SEARCH,
  GET_DETAILS,
  POST_FOOD,
  GET_ALL_USERS,
  GET_USER,
  FAVORITES,
  PUT_BILL,
  GET_ALL_BILLING,
  PUT_USER,
  PUT_QUALIFICATION,
  POST_FAVORITE,
  PUT_FAVORITE
} from "./Constantes";

export const putQualification = (payload) => async () => {
  await axios.put(`foods`, payload);
};

export const postUser = (payload) => async (dispatch) => {
  try {
    const accessoriesCreated = await axios.post(`users`, payload);
    return dispatch({
      type: POST_USER,
      payload: accessoriesCreated,
    });
  } catch (e) {
    console.log(e);
  }
};
export const postBill = (payload) => async (dispatch) => {
  try {
    const accessoriesCreated = await axios.post(`bills`, payload);
    return dispatch({
      type: POST_BILL,
      payload: accessoriesCreated,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllBilling = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`bills`);
    dispatch({
      type: GET_ALL_BILLING,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUser = (mail) => async (dispatch) => {
  try {
    const { data } = await axios.get(`users?mail=${mail}`);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`users`);
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const postFood = (payload) => async (dispatch) => {
  try {
    // console.log("payload", payload);
    await axios.post(`foods`, payload);
    return dispatch({
      type: POST_FOOD,
      payload,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateRoll = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: UPDATE_ROLL,
      payload: payload,
    });
  } catch (e) {
    console.log(e);
  }
};

export const putBill = (payload) => async (dispatch) => {
  try {
    const foodsCreated = await axios.put(`bills`, payload);
    return dispatch({
      type: PUT_BILL,
      payload: foodsCreated,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllFoods = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`foods`);
    dispatch({
      type: GET_ALL_FOODS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getfilterFoods = (payload) => {
  return {
    type: GET_FILTER_FOODS,
    payload,
  };
};
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`foods/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setSearch = (payload) => {
  return {
    type: SEARCH,
    payload,
  };
};

export const shopping = (payload) => {
  const data = reactLocalStorage.get("Shopping").split(",");
  const dataCant = reactLocalStorage.get("ShoppingCant").split(",");
  let dataupdate = [];
  let dataCantupdate = [];
  if (data.includes(payload)) {
    const pos = data.indexOf(payload);
    dataCant[pos] = "delete";
    dataupdate = data.filter((id) => id !== payload);
    dataCantupdate = dataCant.filter((val) => val !== "delete");
  } else {
    data.push(payload);
    dataCant.push("1");
    dataupdate = data;
    dataCantupdate = dataCant;
  }
  reactLocalStorage.set("Shopping", dataupdate);
  reactLocalStorage.set("ShoppingCant", dataCantupdate);

  return {
    type: ADDSHOPPING,
    payload: dataupdate,
  };
};

export const favorites = (payload) => {
  return {
    type: FAVORITES,
    payload,
  };
};
export const putFood = (payload) => {
  return (dispatch) => {
    try {
      axios.put(`foods`, payload).then((response) => {
        dispatch({
          type: "PUT_FOOD",
          payload: payload,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
};
// export const putFood = (payload) => async (dispatch) => {
//   try {
//     const foodEdited = await axios.put(`foods`, payload);
//     console.log("respoinse", payload);
//     return dispatch({
//       type: "PUT_FOOD",
//       payload: payload,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const putUser = (payload) => async (dispatch) => {
  try {
    const response = await axios.put('users', payload )
    return dispatch({
      type: PUT_USER,
      payload: response.data})
  } catch (error) {
    console.log(error.message);
  }
}

export const postFavorite = (payload) => async (dispatch) => {
  try {
    const favoriteCreated = await axios.post(`users/favorites`, payload);
    return dispatch({
      type: POST_FAVORITE,
      payload: favoriteCreated,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteFavorite = (payload) => async (dispatch) => {
  try {
    const favoriteDeleted = await axios.put(`users/favorites`, payload);
    return dispatch({
      type: PUT_FAVORITE,
      payload: favoriteDeleted,
    });
  } catch (e) {
    console.log(e);
  }
};