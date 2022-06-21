
document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
  };


  document.addEventListener("DOMContentLoaded", () => {
    const showTable = document.querySelector("#show");
    const addTable = document.querySelector("#add");

    document.querySelector("#showSt").addEventListener("click", ev => {
        ev.preventDefault();
        showTable.classList.add("hidden");
        addTable.classList.remove("hidden");
    });

    document.querySelector("#addSt").addEventListener("click", ev => {
        ev.preventDefault();
        showTable.classList.remove("hidden");
        addTable.classList.add("hidden");
    });

    });


  
  var user;
  fetch("/currentUser")
  .then(res => res.json())
  .then(data => user = data)
  .then(() => console.log(user))
    
  fetch("/class/allclasses")
  .then(function(response){
      return response.json();
  })
  .then(async function(classeOs){
            
        let out2 ="";
            
        let i = 0;
        let j=0;
        let placeholder2 = document.querySelector("#classDisplay2");
        let placeholder3 = document.querySelector("#classDisplay3");
        let name;
        let surname;
        let x;
        for(let classO of classeOs){
            let out3 ="";
            let out4 ="";
            let out5 ="";
                await fetch("/admin/allstudents")
                .then(function(response){
                    return response.json();
                })
                .then(function(users){
                    x = 0;
                    for(let user of users){
                        if(user.position === "Student"){
                            
                        
                            let students = classO.participants;
                            for(let student of students){
                    
                                if(user.login == student){
                                    name = user.name;
                                    surname = user.surname;
                                
                                console.log("student :", student);
                                out3 += `
                                
                                    <tr>
                                    <td width="40%">${student}</td>
                                    <td width="40%">${name}</td>
                                    <td width="40%">${surname}</td>
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
                            }   
                            if(classO.participants.includes(user.login) ){
                                continue;
                            }
                            out5 += `<tr>
                            <td>${user.login}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td><form action="/class/updateClass" method="post">
                            <input class="hidden" type="text" name="className" value="${classO.className}">
                            <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                            <input class="hidden" type="text" name="participants" placeholder="name" value="${user.login}">
                            <input class="btn btn-secondary" type="submit" value="add">
                            </form></td>
                                </tr>`
                            x++; 

                        } 
                    }



                }).then(()=>console.log("ok"));
                out4 += `
                <tr >
                    <td>${classO.className}</td>
                    <td>${classO.groupNumber}</td>
                    <td>
                    <a style="width:100%" class="btn btn-secondary" data-bs-toggle="collapse" href="#add_${j}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                    ${x} </a>
                    </td>
                    
                </tr>
                <tr id="add_${j}" class="collapse partic"><td colspan="3">
                    <table style="margin-top: 5px;"><tr><th colspan="4">Add Participants</th></tr>
                    <tr>
                    <th>userName</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>remove</th>
                    </tr>
                    ${out5}
                    </table>
                </td></tr>
                `
                placeholder3.innerHTML += out4;
                j++;

            out2 += `
                    <tr >
                        <td>${classO.className}</td>
                        <td>${classO.groupNumber}</td>
                        <td>${classO.teacher}</td>
                        <td>
                            <a style="width:50%" class="btn btn-secondary" data-bs-toggle="collapse" href="#clas_${i}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                            ${classO.participants.length} </a>
                        </td>
                        <td><form action="/class/allclassesDel" method="post">
                        <input class="hidden" type="text" name="className" value="${classO.className}">
                        <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                        <input class="btn btn-secondary" type="submit" value="remove">
                        </form>
                        </td>
                        
                    </tr>
                    <tr id="clas_${i}" class="collapse partic"><td colspan="5">
                    <table style="margin-top: 5px;"><tr><th colspan="4">Participants</th></tr>
                    <tr>
                    <th>userName</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>remove</th>
                    </tr>
                    ${out3}
                    </table>
                    </td></tr>
                    `   

            i++;
            
        }
        
        console.log(user.name);
        placeholder2.innerHTML = out2;
        
            
  });