import axios from "axios"
import {
  ACCESS_TOKEN,
  EMAIL_LOCAL,
  FULLNAME_LOCAL,
  GENDER_LOCAL,
  LOCAL_LOGIN_STATE,
  PROFILE_PHOTO_LOCAL,
  USERNAME_LOCAL
} from "../store/constants"

// const HOST_URL = 'https://new-synote.herokuapp.com/'
const HOST_URL = 'http://192.168.1.11:8080/'


const loginWithUsernamePassword = async User => {

  var url = HOST_URL + "auth/login"
  var username = User.username
  var password = User.password
  localStorage.setItem(USERNAME_LOCAL,username)
  var data = new FormData();
  data.append('username', username);
  data.append('password', password);

  var config = {
    method: 'POST',
    url,
    data
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data;
      let token = result.access_token;
      localStorage.setItem(ACCESS_TOKEN, token)
      if(localStorage.getItem(ACCESS_TOKEN) !== null){
        getUserInfoLogin()
      return token
      }else{
        return null
      }
    })
    .catch(function (error) {
      console.log(error);
    });


}

const getAllDiary = async () => {
  let url = HOST_URL + "diary/all"
  let token = "Bearer " + localStorage.getItem(ACCESS_TOKEN)

  var config = {
    method: 'GET',
    url,
    headers: {
      'Authorization': token
    }
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data
      let diaries = result.data
      return diaries
    })
    .catch(function (error) {
      console.log(error);
    });

}

const addNewDiary = async diary => {
  let url = HOST_URL + "diary/create"
  let token = "Bearer " + localStorage.getItem(ACCESS_TOKEN)
  let content = diary.content
  let display = diary.display

  var data = JSON.stringify({
    "content": content,
    "display": display
  });

  var config = {
    method: 'POST',
    url,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data
  };

  return await axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
}

const registerUser = async User => {

  let url = HOST_URL + "user/register"
  let fullname = User.fullname
  let username = User.username
  let password = User.password
  let email = User.email

  var data = JSON.stringify({
    "full_name": fullname,
    "username": username,
    "password": password,
    "email": email
  })
  var config = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data;
      let status = result.status;
      return status
    })
    .catch(function (error) {
      console.log(error);
    });


}

const getDiary = async id => {
  let username = localStorage.getItem(USERNAME_LOCAL)
  let url = HOST_URL + "diary/" + username + "/" + id
  let token = localStorage.getItem(ACCESS_TOKEN)


  var config = {
    method: 'GET',
    url,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return await axios(config)
    .then(function (response) {
      const data = response.data
      let diary = data.data
      return diary
    })
    .catch(function (error) {
      console.log(error);
    });



}
const genderValue = (gender) => {
  switch (gender) {
      case '0': return "Not update"
      case '1': return "Male"
      case '2': return "Female"
      case '3': return "Unknown"
      default: return "Not update"
  }
}
const getUserInfoLogin = async () => {
  var username = localStorage.getItem(USERNAME_LOCAL)
  var token  = localStorage.getItem(ACCESS_TOKEN)
  let url = HOST_URL + "user/profile/" + username

  var config = {
    method: 'GET',
    url,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data
      let status = result.status

      localStorage.setItem(FULLNAME_LOCAL, result.data.full_name)
      localStorage.setItem(EMAIL_LOCAL, result.data.email)
      localStorage.setItem(GENDER_LOCAL, result.data.gender)
      localStorage.setItem(PROFILE_PHOTO_LOCAL, result.data.profile_image)
  
      return status
  
      
    })
    .catch(function (error) {
      console.log(error);
    });

}

const updateDiary = async Diary => {
  let id = Diary.id
  let url = HOST_URL + "diary/edit/" + id
  let token = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
  let content = Diary.content
  var data = JSON.stringify({
    "content": content,
    "display": true
  });

  var config = {
    method: 'PUT',
    url,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data,
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data;
      let status = result.status;
      return status
    })
    .catch(function (error) {
      console.log(error);
    });

}

const deleteDiary = async id => {
  let url = HOST_URL + "diary/delete/" + id
  let token = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)


  var config = {
    method: 'DELETE',
    url,
    headers: {
      'Authorization': token
    }
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data
      let status = result.status
      return status
    })
    .catch(function (error) {
      console.log(error);
    });

}

const pingServer = async () => {
  let url = HOST_URL
  var config = {
    method: 'GET',
    url,
    headers: {}
  };

  return await axios(config)
    .then(function (response) {
      let result = response.data
      console.log(result.msg)
      let status = result.status
      return status
    })
    .catch(function (error) {
      console.log(error);
    });

}
const updateProfilePhoto = async url => {
  var token = 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
  var data = {
    "profile_image": url
  };
  
  var config = {
    method: 'PUT',
    url: HOST_URL+'user/edit/'+localStorage.getItem(USERNAME_LOCAL),
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data
  };
  
  return await axios(config)
  .then(function (response) {
    let result = response.data
    let status = result.status
    return status
  })
  .catch(function (error) {
    console.log(error);
  });
}
const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_LOGIN_STATE)
  localStorage.removeItem(USERNAME_LOCAL)
  localStorage.removeItem(FULLNAME_LOCAL)
  localStorage.removeItem(GENDER_LOCAL)
  localStorage.removeItem(PROFILE_PHOTO_LOCAL)
  localStorage.removeItem(EMAIL_LOCAL)
}

const updateUserInforAPI = async user =>{
  var token = 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)
  var username = localStorage.getItem(USERNAME_LOCAL)
  var url = HOST_URL + 'user/edit/'+username
  var data = JSON.stringify({
    "full_name": user.full_name,
    "gender": Number(user.gender)
  });
  
  var config = {
    method: 'PUT',
    url,
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data
  };
  
 return await axios(config)
  .then(function (response) {
    const result = response.data
    const status = result.status
    return status
  })
  .catch(function (error) {
    console.log(error);
  });
}
export {
  loginWithUsernamePassword,
  registerUser,
  getAllDiary,
  addNewDiary,
  getDiary,
  updateDiary,
  deleteDiary,
  pingServer,
  logout,
  updateProfilePhoto,
  getUserInfoLogin,
  genderValue,
  updateUserInforAPI
}
