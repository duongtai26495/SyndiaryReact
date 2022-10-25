import axios from "axios"
import { USERNAME_LOCAL, FULLNAME_LOCAL } from "../store/constants"
import { ACCESS_TOKEN } from "../store/constants"

const HOST_URL = 'https://new-synote.herokuapp.com/'
// const HOST_URL = 'http://192.168.1.10:8080/'


const loginWithUsernamePassword = async User => {

  let url = HOST_URL + "auth/login"
  let username = User.username
  let password = User.password
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
      getUserInfoLogin(username, token)
      return token
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

const addNewDiary = async diary =>{
  let url = HOST_URL + "diary/create"
  let token = "Bearer " + localStorage.getItem(ACCESS_TOKEN)
  let content = diary.content
  let display = diary.display

  var data = JSON.stringify({
    "content":content,
    "display":display
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

const registerUser = async User =>{

  let url = HOST_URL + "user/register"
  let fullname = User.fullname
  let username = User.username
  let password = User.password
  let email = User.email

  var data = JSON.stringify({
    "full_name":fullname,
    "username":username,
    "password":password,
    "email":email
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

const getDiary = async id =>{
  let username = localStorage.getItem(USERNAME_LOCAL)
  let url = HOST_URL + "diary/"+username+"/"+id
  let token = localStorage.getItem(ACCESS_TOKEN)


var config = {
  method: 'GET',
  url,
  headers: { 
    'Authorization': 'Bearer '+token
  }
};

return await axios(config)
.then(function (response) {
    const data =response.data
    let diary = data.data
    return diary
})
.catch(function (error) {
  console.log(error);
});



}

const getUserInfoLogin = async (username,token) => {

  let url = HOST_URL + "user/profile/"+username

  var config = {
    method: 'GET',
    url,
    headers: { 
      'Authorization': 'Bearer '+token
    }
  };
  
 return await axios(config)
  .then(function (response) {
    let result =  response.data.data
    let status = result.status
    
    localStorage.setItem(USERNAME_LOCAL, result.username)
    localStorage.setItem(FULLNAME_LOCAL, result.full_name)
  })
  .catch(function (error) {
    console.log(error);
  });
}

const updateDiary = async Diary => {
  let id = Diary.id
  let url = HOST_URL + "diary/edit/"+id
  let token = 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
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

const deleteDiary = async id =>{
  let url = HOST_URL + "diary/delete/"+id
  let token = 'Bearer '+localStorage.getItem(ACCESS_TOKEN)


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
    headers: { }
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
export {
  loginWithUsernamePassword,
  registerUser,
  getAllDiary,
  addNewDiary,
  getDiary,
  updateDiary,
  deleteDiary,
  pingServer
}
