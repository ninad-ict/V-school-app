import * as actionTypes from './actionTypes';
import http from './../common/axios';

const setStates = (states) => {
  return {
    type: actionTypes.SET_STATES,
    payload: states,
  };
};

const setBoards = (boards) => {
  return {
    type: actionTypes.SET_BOARDS,
    payload: boards,
  };
};

const setDistricts = (districts) => {
  return {
    type: actionTypes.SET_DISTRICTS,
    payload: districts,
  };
};

const setMediums = (mediums) => {
  return {
    type: actionTypes.SET_MEDIUM,
    payload: mediums,
  };
};

const setClasses = (classes) => {
  return {
    type: actionTypes.SET_CLASSES,
    payload: classes,
  };
};

export const getStates = () => {
  return (dispatch) => {
    http
      .get('getStates/')
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('[ STATES ]', result.response);
          if (result.response && result.response.length > 0) {
            dispatch(
              getMedium({
                state_id: result.response[0].state_id,
              }),
            );
          }
          dispatch(setStates(result.response));
        }
      })
      .catch((err) => {
        console.log('ERROR getting states');
        console.log(err);
      });
  };
};

export const getBoards = (param) => {
  return (dispatch) => {
    http
      .post('getBoardsByState/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('[ Boards ] ', result.response);
          if (result.response && result.response.length > 0) {
            dispatch(
              getDistricts({
                board_id: result.response[0].board_id,
              }),
            );
          }
          dispatch(setBoards(result.response));
        } else {
          dispatch(setBoards([]));
        }
      })
      .catch((err) => {
        dispatch(setBoards([]));
      });
  };
};

export const getDistricts = (param) => {
  return (dispatch) => {
    http
      .post('getDistrictByBoard/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('[ Districts ]', result.response);

          dispatch(setDistricts(result.response));
        } else {
          dispatch(setDistricts([]));
        }
      })
      .catch((err) => {
        dispatch(setDistricts([]));
      });
  };
};

export const getMedium = (param) => {
  return (dispatch) => {
    http
      .post('getMediumByState/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('[ Mediums ]', result.response);
          dispatch(setMediums(result.response));
        } else {
          dispatch(setMediums([]));
        }
      })
      .catch((err) => {
        dispatch(setMediums([]));
      });
  };
};

export const getClasses = (param) => {
  return (dispatch) => {
    http
      .post('getClassesByDistrict/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log('[ Classes ]', result.response);
          dispatch(setClasses(result.response));
        } else {
          dispatch(setClasses([]));
        }
      })
      .catch((err) => {
        dispatch(setClasses([]));
      });
  };
};

export const setAppVersion = (version) => {
  return {
    type: actionTypes.SET_APP_VERSION,
    payload: version,
  };
}

export const updateAppVersion = (param) => {
  return (dispatch) => {
    http
      .post('updated_user_app_version/', param)
      .then((result) => {
        result = result.data;
        if (result && result.status === 200) {
          console.log(result, "result setting app verison")
          dispatch(setAppVersionStatus(result.response,true));
        }
      })
      .catch((err) => {
        console.log(err, "err setting app verison")
        dispatch(setAppVersionStatus(err,false));
      });
  }
}

export const setAppVersionStatus = (response, flag) =>{
  if(flag){
    return {
      type: actionTypes.APP_VERSION_UPDATE_SUCCESS,
      payload: response,
    };
  }else{
    return {
      type: actionTypes.APP_VERSION_UPDATE_FAILED,
      payload: response,
    };
  }
}