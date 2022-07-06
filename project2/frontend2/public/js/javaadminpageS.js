
document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};


fetch("/admin/allstudents")
.then(function(response){
    return response.json();
})
.then(function(users){
    let out1 ="";
    let out2 ="";
    let placeholder1 = document.querySelector("#studentDisplay");
    let placeholder2 = document.querySelector("#teacherDisplay");
    
    for(let user of users){
            out1 += `
            <tr>
                <td>${user.login}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.mail}</td>

                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user._id}">
                <input class="btn btn-secondary" type="submit" value="delete" id="deleted">
            </form></td>
            <tr>
            `
        
    }
    placeholder1.innerHTML = out1;
});

{/* <td><form action="/admin/userPosition" method="post">
<input class="hidden" type=text name="login" value="${user.login}">
<select name="position" size="1" onchange="this.form.submit()">
<option>${user.position}</option>
<option>${user.position == "Student"?"Teacher":"Student"}</option>
</select>
</form>
</td> */}
{/* <td>
${user.position}
</td> */}