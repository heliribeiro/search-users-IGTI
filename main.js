let inputUser = null;
let buttonSearch = null;
let listUsers = null;
let userStatistics = null;
let search
let users = [];
let totalUsers = []
let info = null
window.addEventListener("load", async () => {
  inputUser = document.querySelector("#search-users");
  buttonSearch = document.querySelector("#search")
  listUsers = document.querySelector("#users-list");
  userStatistics = document.querySelector("#statistics");
  info = document.querySelector('h4')
  let response = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  response = await response.json();
  totalUsers = response.results
  //info.innerHTML = '0 Usuário(s) encontrado(s)'
  handleSearchUsers();
});

function handleSearchUsers() {
  inputUser.addEventListener("keyup", loadUsersInput);
  buttonSearch.addEventListener("click", loadUsersButton);
}

 function loadUsersButton (){

    if(inputUser.value.trim() === ''){
        return
    }

      users = totalUsers.map((user) => {
        const { name, picture, dob, gender } = user;
        return {
          firstName: name.first,
          lastName: name.last,
          picture: picture.thumbnail,
          age: dob.age,
          gender
        };
      }).filter(user => {
              
          return (
            user.firstName.toLowerCase().includes(inputUser.value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(inputUser.value.toLowerCase())          
          )
      })
      inputUser.value = ''
      render();
      
}

 function loadUsersInput(event) {
 
if(event.target.value.trim() === ''){
    return
}


if(event.key === 'Enter'){

  users = totalUsers.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      firstName: name.first,
      lastName: name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender
    };
  }).filter(user => {

      return (
         user.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      )
  })
  inputUser.value = ''
  render();
}

}

function render() {
  renderUsers();
  renderStatistics();
  renderInfo();
}

function renderInfo (){

}

function renderUsers() {
  let usersFound = "<div>";
  users.forEach((user) => {
    const { firstName, lastName, picture, age, gender } = user;
    const userfound = `
        <div class="user">
        <img src=${picture}> 
        <span>
        ${firstName} ${lastName}, ${age} anos        
        </span>
        </div>      
        `;
    usersFound += userfound;
  });
  usersFound += "</div>";
  listUsers.innerHTML = usersFound;
}

function renderStatistics(){
    const countMale = users.filter(user=> user.gender === 'male').length
    const countFemale = users.filter(user=> user.gender === 'female').length
    const sumAges = users.reduce((accumulator,user)=> accumulator + user.age,0)
    const media = parseInt(sumAges/(countMale + countFemale))
    const total = countMale+countFemale
    info.innerHTML = `${total} Usuário(s) encontrado(s)` 

    const statistics = `
        <div>
            <p> Sexo masculino: ${countMale}</p>
            <p> Sexo feminino: ${countFemale}</p>
            <p> Soma das idades: ${sumAges}</p>
            <p> Média das idades: ${media || 0}</p>
        </div>
    `
    userStatistics.innerHTML = statistics
}
