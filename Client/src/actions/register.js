import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  HOBBY_REQUEST,
  HOBBY_SUCCESS,
  HOBBY_FAILURE,
  CLEAR_GUEST
} from "../commons/action.type";
import axios from "../utils/axios";

export const userRegister = infoInput => async (dispatch, getState) => {
  const userInfo = {
    email: infoInput.mail,
    firstName: infoInput.firstName,
    lastName: infoInput.lastName,
    phone: infoInput.phoneNumber,
    password: infoInput.password,
    hobbies: infoInput.hobbies.reduce((result, hobbyRegist) => {
      getState().register.userHobbies.hobbies.filter(hobby => {
        if (hobby.key === hobbyRegist) {
          result.push({
            key: hobby.key,
            value: hobby.text
          });
          return true;
        }
        return false;
      });
      return result;
    }, []),
    eventTopics: infoInput.eventTopics.reduce((result, topicRegist) => {
      getState().create.eventTopic.topic.filter(topic => {
        if (topic.key === topicRegist) {
          result.push({
            key: topic.key,
            value: topic.text
          });
          return true;
        }
        return false;
      });
      return result;
    }, [])
  };
  dispatch({
    type: REGISTER_REQUEST
  });

  try {
    const response = await axios.post("/users/register", userInfo);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : null
    });
  }
};

export const getHobbies = () => async dispatch => {
  dispatch({
    type: HOBBY_REQUEST
  });

  try {
    const response = await axios.get("/users/hobbies");

    dispatch({
      type: HOBBY_SUCCESS,
      payload: response.data.map(hobby => {
        const { key, value } = hobby;
        return {
          key,
          value: key,
          text: value
        };
      })
    });
  } catch (error) {
    dispatch({
      type: HOBBY_FAILURE,
      payload: error.response ? error.response ? error.response.data : null : null
    });
  }
};

export const clearGuest = () => dispatch => {
  dispatch({
    type: CLEAR_GUEST
  });
};
