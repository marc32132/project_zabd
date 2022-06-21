document.getElementById("logoutLink").onclick = function () {
  document.getElementById("logout").submit();
};
function showHideTables(){
  var tablerows = document.querySelector(".participants");
  tablerows.classList.toggle("hidden");
}

var user;
fetch("/currentUser")
.then(res => res.json())
.then(data => user = data)
.then(() => console.log(user))


fetch("/class/allclasses")
.then(function(response){
    return response.json();
})
.then(function(classeOs){
    let name = user.name[0].toUpperCase() + user.name.slice(1).toLowerCase();
    let surname = user.surname[0].toUpperCase() + user.surname.slice(1).toLowerCase();  
    let out2 ="";
    let i = 0;
    let placeholder2 = document.querySelector("#classDisplay2");
    
    for(let classO of classeOs){
      if(classO.teacher == name + surname){
      let out3 ="";
      fetch("/admin/allstudents")
      .then(function(response){
        return response.json();
      })
      .then(function(users){
      for(let user of users){  
      classO.participants.forEach(student => {
        if(student == user.login){
        out3 += `
        
            <tr>
            <td>${user.login}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td width="40%"><form action="/class/removeParticipant" method="post">
            <input class="hidden" type="text" name="className" value="${classO.className}">
            <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
            <input class="hidden" type="text" name="student" placeholder="student" value="${student}">
            <input class="btn btn-secondary" type="submit" value="remove">
            </form>
            
            </tr>
            </td>
        `
        }
      })
      }
      placeholder2.innerHTML += `
            <tr >
                <td>${classO.className}</td>
                <td>${classO.groupNumber}</td>
                <td>
                  <a style="width:100%" class="btn btn-secondary" data-bs-toggle="collapse" href="#clas_${i}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                  ${classO.participants.length} </a>
                </td>
                
            </tr>
            <tr id="clas_${i}" class="collapse partic"><td colspan="3">
            <table style="margin-top: 5px;"><tr><th colspan="4">Participants</th></tr>
            <tr>
              <th class="th-sm">userName</th>
              <th class="th-sm">name</th>
              <th class="th-sm">surname</th>
              <th>remove</th>
            </tr>
            ${out3}
            </table>
            </td></tr>
            `
      i++;
      })
    }
  }
    console.log(user.name);

    
    let nameOfUser = document.querySelector("#nameTagUser");
    nameOfUser.innerHTML = `Welcome ${name}`;
});

// function myFunction() {
//   // Declare variables
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");

//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }
