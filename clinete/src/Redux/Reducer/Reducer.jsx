import {
  POST_BILL,
  UPDATE_ROLL,
  POST_USER,
  ADDSHOPPING,
  GET_FILTER_FOODS,
  GET_ALL_FOODS,
  SEARCH,
  GET_DETAILS,
  FAVORITES,
  POST_FOOD,
  GET_ALL_USERS,
  GET_USER,
  PAY,
  PUT_FOOD,
  PUT_BILL,
  GET_ALL_BILLING,
  POST_FAVORITE,
  PUT_FAVORITE
} from "../Actions/Constantes";
const initialState = {
  foods: [],
  allFoods: [],
  shopping: [],
  user: [],
  allUsers: [],
  roll: "client",
  favorites: [],
  pay: [],
  bill: [],
  billput: [],
  allbilling: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ROLL:
      return {
        ...state,
        roll: action.payload,
      };
    case PUT_BILL:
      return {
        ...state,
        billput: [...state.billput, action.payload],
      };
    case POST_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case POST_BILL:
      return {
        ...state,
        bill: [...state.bill, action.payload],
      };
    case POST_FOOD:
      return {
        ...state,
        foods: [...state.foods, action.payload],
      };
    case GET_FILTER_FOODS:
      return {
        ...state,
        foods: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_ALL_BILLING:
      return {
        ...state,
        allbilling: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ALL_FOODS:
      return {
        ...state,
        foods: action.payload,
        allFoods: action.payload,
      };

    case SEARCH:
      let search = [];
      search = state.allFoods?.filter((e) =>
        e.location.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        foods: [...search],
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case ADDSHOPPING:
      return {
        ...state,
        shopping: action.payload,
      };
    case FAVORITES:
      const filterFavorites = state.favorites?.filter(
        (fav) => fav.id === action.payload.id
      );
      if (filterFavorites.length !== 0) {
        let favoritesFiltered = state.favorites.filter(
          (fav) => fav.id !== filterFavorites[0].id
        );
        return {
          ...state,
          favorites: favoritesFiltered,
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
    case PUT_FOOD:
      // Busca el índice del alimento a actualizar
      const foodIndex = state.foods.findIndex(
        (food) => food.id === action.payload.id
      );

      // Actualiza el alimento en el estado
      const updatedFoods = [...state.foods];
      updatedFoods[foodIndex] = action.payload;

      // Devuelve el nuevo estado actualizado
      return {
        ...state,
        foods: updatedFoods,
      };
      case POST_FAVORITE:
        return {
          ...state
        }
        case PUT_FAVORITE:
          return {
            ...state
          }

    default:
      return state;
  }
};
export default rootReducer;
