import http from "./axios";

const config = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

export function startAuth(mobile,isEmail,emailId)
{
    console.log("Entered startAuth");
    http
    .post(`mobileSignupLogin/`, {
      mobile: mobile,
      user_type: 'STUDENT',
      otp_on_email : isEmail,
      email : emailId
    },config)
    .then((result) => {
      result = result.data;
      if (result.status == 200) {
        console.log('LOGIN', result.response);       
      } else {
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log(err);
    //   dispatch(authFailed(err.message));
    });
}



export const verifyOTP = (mobile,otp) => {
    // return (dispatch) => {
    //   dispatch(authStarted());
    console.log("Reached verifyOTP");
      http
        .post(`studentotpverification/`, {
          mobile: mobile,
          otp: otp,
        },config)
        .then((result) => {
          console.log(result);
          result = result.data;
          if (result.status === 200) {

            console.log("200 Status achieved");
            console.log(result);
            // dispatch(
            //   authSuccess({
            //     ...store.getState().auth.user,
            //     ...result.response,
            //     //theme: {name: 'Purple'},
            //   }),
            // );
          } else {
            // dispatch(authFailed(result.message));
            console.log("maybe something went wrong");
          }
        })
        .catch((err) => {
        //   dispatch(authFailed('Something went wrong'));
          console.log('Verification OTP failed');
          console.log(err);
        });
    // };
  };


