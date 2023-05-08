async function login()
{   

        let obj = { UserName : document.getElementById("username").value,
        Password : document.getElementById("password").value
     }
     
     let fetchParams = { method : 'POST',
                body : JSON.stringify(obj),
                headers : { "Content-Type" : "application/json"}
              };
     
     let resp = await fetch("https://localhost:44347/api/Login" , fetchParams);
     let result = await resp.json();

     if(result === true)
     {
     alert("Welcome " + obj.UserName);
     localStorage.setItem("UserName", obj.UserName);
     
     const a= await GetNumOfAction(obj);
     
     window.location.href = "home.html";
     CheckAccess()
     }
     else{
        document.getElementById('errMsg').innerText = "User Name or Password is Incorrect ! Please try again";
     }
     
     }
     
     
     

async function GetNumOfAction(obj)
{
    let fetchParams = { method : 'POST',
    body : JSON.stringify(obj),
    headers : { "Content-Type" : "application/json"}
  };

let resp = await fetch("https://localhost:44347/api/User" , fetchParams);
let result = await resp.json();
    
    localStorage.setItem("NumOfAction", result.NumOfAction);

}
    

async function CheckAccess()
{
    
    
    var datecount = new Date();
    localStorage.setItem("actualdate", datecount);
    var chck = localStorage.getItem("access")
    
    if(chck === "false" )
    {
        alert("Come back Tomorrow, " + (localStorage.getItem("endDates")));
        if(localStorage.getItem("actualdate") >= localStorage.getItem("endDates") || result2.ID != userid)
        {
            localStorage.setItem("access", true);
            localStorage.clear();
            CheckAccess();
        }
    }
    else if(chck === "true")
    {
        alert("Welcome");
        
    }
}




async function showName()
{
   
    var CurrentUser = document.getElementById("showN");
    let CurrentActions = document.getElementById("nactions");
    CurrentUser.innerText = "Hello " + localStorage.getItem("UserName") + " !";
    CurrentActions.innerText = "You have  " + localStorage.getItem("NumOfAction") + " actions left.";
}


function changeacess()
        {
           
            localStorage.setItem("access", false);
            var now = new Date();
            var endDate = new Date();
            endDate.setDate(endDate.getDate() + 1);
            localStorage.setItem("nows", now);
            localStorage.setItem("endDates", endDate);
        }



async function ActionTracker()
{ 
   
    let CurrentActions = localStorage.getItem("NumOfAction") - 1;
    
    localStorage.setItem("NumOfAction", CurrentActions);
    
    if(CurrentActions === 0)
    {
        changeacess();
        logout();
        
    }
    else
    {
        showName();
    }
}



async function logout()
        {
           
            window.location.href = "login.html";
        }



async function navBar()
{
   
    let thHomeObj = document.createElement('th');
    let thDepObj = document.createElement('th');
    let thEmpObj = document.createElement('th');
    let thShfObj = document.createElement('th');

    let nvHomeObj = document.createElement('a');
    let nvDepObj = document.createElement('a');
    let nvEmpObj = document.createElement('a');
    let nvShfObj = document.createElement('a');

    nvHomeObj.innerText = 'Home';
    nvDepObj.innerText = 'Department';
    nvEmpObj.innerText = 'Employees';
    nvShfObj.innerText = 'Shifts';

    nvHomeObj.href = 'home.html';
    nvDepObj.href = 'departments.html';
    nvEmpObj.href = 'employees.html';
    nvShfObj.href = 'shifts.html';

    let nvBarObj = document.createElement('table');
    
    thHomeObj.appendChild(nvHomeObj);
    thDepObj.appendChild(nvDepObj);
    thEmpObj.appendChild(nvEmpObj);
    thShfObj.appendChild(nvShfObj);

    nvBarObj.appendChild(thHomeObj);
    nvBarObj.appendChild(thDepObj);
    nvBarObj.appendChild(thEmpObj);
    nvBarObj.appendChild(thShfObj);

    document.getElementById('navBar').appendChild(nvBarObj);
    ActionTracker()
    
}

async function loadDepartment()
    {
        
        let resp = await fetch("https://localhost:44347/api/Department");
        let data = await resp.json();
        
        
        data.forEach(DepWithEmp => {
            
            
            let tdDepnameObj = document.createElement("td");
            let tdNameObj = document.createElement("td");
            let tdEditObj = document.createElement("td");
            let tdDeleteObj = document.createElement("td");
            
            
            tdDepnameObj.innerText = DepWithEmp.Name;
            tdNameObj.innerText = DepWithEmp.FirstName + " " + DepWithEmp.LastName;
            
            
            tdEditObj = document.createElement("button");
            tdEditObj.innerHTML = "Edit";
            var clicked = false;
            tdEditObj.onclick = function editID()
            {
                clicked = true;
                if(clicked = true)
                {   
                    window.location.href = "department.html?DepWithEmpID=" + DepWithEmp.ID
                }
            };
            
            
            var empexist = false;
           if(DepWithEmp.DepartmentID == DepWithEmp.ID)
            {
                empexist = true;
            }

            
            if(empexist == false)
            {
                tdDeleteObj = document.createElement("button");
                tdDeleteObj.innerHTML = "Delete";
                var clicked1 = false;
                tdDeleteObj.onclick = async function deleteDep()
                {
                    clicked1 = true;
                    if(clicked1 = true)
                    {
                        let fectParams = { method : 'DELETE',  
                                           headers : { "Content-Type" : "application/json"} 
                                         };
    
                        let resp = await fetch("https://localhost:44347/api/Department/" + DepWithEmp.ID, fectParams);
                        let status =  await resp.json();
                        window.location.href = "departments.html"
                        ActionTracker()
                    }
                };
            }
            else
            {
                
                tdDeleteObj.innerText = "Clear the Department from employees to delete it";
           }
           
            
            let trObj = document.createElement("tr");

            
            trObj.appendChild(tdDepnameObj);
            trObj.appendChild(tdNameObj);
            trObj.appendChild(tdEditObj);
            trObj.appendChild(tdDeleteObj);

            document.getElementById('tbl').appendChild(trObj);
            
        });
    }


async function getDepID()
        {
            
            const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
        
            let resp =  await fetch("https://localhost:44347/api/Department/" + DepWithEmpID);
            let data = await resp.json();

            
            document.getElementById("dep").value = data.Name
            
            document.getElementById("mngr").value = data.Manager;
        }



async function updateDep()
        {
            
            const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
        
            let obj = { name : document.getElementById("dep").value,
                        Manager : document.getElementById("mngr").value
                      };
    
    
        let fectParams = { method : 'PUT',
        body : JSON.stringify(obj),
        headers : { "Content-Type" : "application/json"} 
        };
    
         let resp = await fetch("https://localhost:44347/api/Department/" + DepWithEmpID, fectParams);
         let status =  await resp.json();

        
         window.location.href = "Departments.html"
         ActionTracker()
        }   



async function gotoAddDep()
{
    
    const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');
    window.location.href = "addnewdep.html?DepWithEmpID=" + DepWithEmpID 
    ActionTracker()
};



async function addNewDep()
{
    
    const urlParams = new URLSearchParams(window.location.search);
            DepWithEmpID = urlParams.get('DepWithEmpID');

    let obj = { name : document.getElementById("addname").value,
                Manager : document.getElementById("addmngr").value  
             };


    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

    let resp = await fetch("https://localhost:44347/api/Department", fectParams);
    let status =  await resp.json();

    
    window.location.href = "departments.html"
    ActionTracker()
}


async function loadEmployees()
    {
        
        let resp = await fetch("https://localhost:44347/api/Employee");
        let data = await resp.json();

        
        data.forEach((ExtendEmp) => {

            
            let tdFulLastNameObj = document.createElement("td");
            let tdDepaObj = document.createElement("td");
            let tdStartYearObj = document.createElement("td");
            let tdShiftIDObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdDateObj = document.createElement("td");

            
            tdFulLastNameObj.innerText = ExtendEmp.FirstName + " " + ExtendEmp.LastName;
            tdDepaObj.innerText = ExtendEmp.Name;
            tdStartYearObj.innerText = ExtendEmp.StartWorkYear;

            
            let ulShiftIDObj = document.createElement("ul");
            let ulHoursObj = document.createElement("ul");
            let ulDateObj = document.createElement("ul");

                
                for (let i = 0; i < ExtendEmp.ExtendShiftz.length; i++)
                {
                    
                    let liShiftIDObj = document.createElement("li");
                    let liHoursObj = document.createElement("li");
                    let liDateObj = document.createElement("li");

                    
                    liShiftIDObj.innerText = ExtendEmp.ExtendShiftz[i].ShiftID;
                    liHoursObj.innerText = ExtendEmp.ExtendShiftz[i].StartTime + ":00 -" + ExtendEmp.ExtendShiftz[i].EndTime + ":00";
                    liDateObj.innerText = ExtendEmp.ExtendShiftz[i].Date;

                    
                    ulShiftIDObj.appendChild(liShiftIDObj);
                    ulHoursObj.appendChild(liHoursObj);
                    ulDateObj.appendChild(liDateObj);

                    
                    tdShiftIDObj.appendChild(ulShiftIDObj);
                    tdHoursObj.appendChild(ulHoursObj);
                    tdDateObj.appendChild(ulDateObj);

                    
                    tdEditObj = document.createElement("button");
                    tdEditObj.innerHTML = "Edit";
                    var clicked = false;
                    tdEditObj.onclick = function editID()
                    {
                        clicked = true;
                        if(clicked = true)
                        {
                            window.location.href = "employee.html?ExtendEmp=" + ExtendEmp.ID
                            ActionTracker()
                        }
                    };

                    
                    tdDeleteObj = document.createElement("button");
                    tdDeleteObj.innerHTML = "Delete";
                    var clicked1 = false;
                    tdDeleteObj.onclick = async function deleteDep()
                    {
                        clicked1 = true;
                        if(clicked1 = true)
                        {
                            let fectParams = { method : 'DELETE',  
                                               headers : { "Content-Type" : "application/json"} 
                                             };
        
                            let resp = await fetch("https://localhost:44347/api/Employee/" + ExtendEmp.ID, fectParams);
                            let status =  await resp.json();
            
                            window.location.href = "employees.html"
                            ActionTracker()
                        }
                    };

                    
                    tdAddSObj = document.createElement("button");
                    tdAddSObj.innerText = "Add new Shift";
                    var clicked2 = false;
                    tdAddSObj.onclick = function GotoAddShift()
                    {
                        clicked2 = true;
                        if(clicked2 = true)
                        {
                            window.location.href = "addnewshift.html?ExtendEmp=" + ExtendEmp.ID;
                            ActionTracker()
                        }
                    };
                };

                
            let trObj = document.createElement("tr");

            
            trObj.appendChild(tdFulLastNameObj);
            trObj.appendChild(tdDepaObj);
            trObj.appendChild(tdStartYearObj);
            trObj.appendChild(tdShiftIDObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdEditObj);   
            trObj.appendChild(tdDeleteObj);   
            trObj.appendChild(tdAddSObj);   

            
            document.getElementById('tbl2').appendChild(trObj);       
        }); 
    }



async function sendSearch()
{
    
    
    let input = document.getElementById("searchTXT").value;
    
    localStorage.setItem("SearchInput", input);
 
    
    window.location.href = "searchresult.html";
    ActionTracker();
}

async function ShowResult()
{
   let Cinput = localStorage.getItem("SearchInput");
   let resp = await fetch("https://localhost:44347/api/Employee");
   let data = await resp.json();

   let noresult = 0;

    data.forEach((ExtendEmp) => {
    
    if((Cinput.toLowerCase() == ExtendEmp.FirstName.toLowerCase()) || (Cinput.toLowerCase() == ExtendEmp.LastName.toLowerCase()) || (Cinput.toLowerCase() == ExtendEmp.Name.toLowerCase()))
    {
        let tdFulLastNameObj = document.createElement("td");
        let tdDepaObj = document.createElement("td");
        let tdStartYearObj = document.createElement("td");
        let tdShiftIDObj = document.createElement("td");
        let tdHoursObj = document.createElement("td");
        let tdDateObj = document.createElement("td");

        tdFulLastNameObj.innerText = ExtendEmp.FirstName + " " + ExtendEmp.LastName;
        tdDepaObj.innerText = ExtendEmp.Name;
        tdStartYearObj.innerText = ExtendEmp.StartWorkYear;

        let ulShiftIDObj = document.createElement("ul");
        let ulHoursObj = document.createElement("ul");
        let ulDateObj = document.createElement("ul");

        for (let i = 0; i < ExtendEmp.ExtendShiftz.length; i++)
        {
            let liShiftIDObj = document.createElement("li");
            let liHoursObj = document.createElement("li");
            let liDateObj = document.createElement("li");

            
            liShiftIDObj.innerText = ExtendEmp.ExtendShiftz[i].ShiftID;
            liHoursObj.innerText = ExtendEmp.ExtendShiftz[i].StartTime + ":00 -" + ExtendEmp.ExtendShiftz[i].EndTime + ":00";
            liDateObj.innerText = ExtendEmp.ExtendShiftz[i].Date;

            ulShiftIDObj.appendChild(liShiftIDObj);
            ulHoursObj.appendChild(liHoursObj);
            ulDateObj.appendChild(liDateObj);

            tdShiftIDObj.appendChild(ulShiftIDObj);
            tdHoursObj.appendChild(ulHoursObj);
            tdDateObj.appendChild(ulDateObj);

            tdEditObj = document.createElement("button");
            tdEditObj.innerHTML = "Edit";
            var clicked = false;
            tdEditObj.onclick = function editID()
            {
                clicked = true;
                if(clicked = true)
                {
                    window.location.href = "employee.html?ExtendEmp=" + ExtendEmp.ID
                    ActionTracker()
                }
            };

            tdDeleteObj = document.createElement("button");
            tdDeleteObj.innerHTML = "Delete";
            var clicked1 = false;
            tdDeleteObj.onclick = async function deleteDep()
            {
                clicked1 = true;
                if(clicked1 = true)
                {
                    let fectParams = { method : 'DELETE',  
                                       headers : { "Content-Type" : "application/json"} 
                                     };

                    let resp = await fetch("https://localhost:44347/api/Employee/" + ExtendEmp.ID, fectParams);
                    let status =  await resp.json();
    
                    window.location.href = "employees.html"
                    ActionTracker()
                }
            };

            tdAddSObj = document.createElement("button");
            tdAddSObj.innerText = "Add new Shift";
            var clicked2 = false;
            tdAddSObj.onclick = function GotoAddShift()
            {
                clicked2 = true;
                if(clicked2 = true)
                {
                    window.location.href = "addnewshift.html?ExtendEmp=" + ExtendEmp.ID;
                }
            };
        };

    let trObjR = document.createElement("tr");

    trObjR.appendChild(tdFulLastNameObj);
    trObjR.appendChild(tdDepaObj);
    trObjR.appendChild(tdStartYearObj);
    trObjR.appendChild(tdShiftIDObj);
    trObjR.appendChild(tdHoursObj);
    trObjR.appendChild(tdDateObj);
    trObjR.appendChild(tdEditObj);   
    trObjR.appendChild(tdDeleteObj);   
    trObjR.appendChild(tdAddSObj);  

    document.getElementById('tblR').appendChild(trObjR);

    }
    else
    {
        noresult = noresult + 1;
    }

    }); 
    
    if(noresult === data.length)
    {
        alert("No Result Found");
    }

    ActionTracker();

}

async function backB()
{
    window.location.href = "employees.html";
}


async function getEmpID()
        {
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44347/api/Employee/" + ExtendEmp);
            let data = await resp.json();

            document.getElementById("FirstName").value = data.FirstName;
            document.getElementById("LastName").value = data.LastName;
            
            let resp2 = await fetch("https://localhost:44347/api/Department");
            let datas = await resp2.json();
        
           
           
            datas.forEach(DepWithEmp => {

                let opDepObj = document.createElement("option");

                opDepObj.innerText = DepWithEmp.ID + ") " + DepWithEmp.Name;
                opDepObj.value = DepWithEmp.ID;

                document.getElementById('depa').appendChild(opDepObj);
            });

            ActionTracker();

        }


async function updateEmp()
        {
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let obj = { FirstName : document.getElementById("FirstName").value,
                        LastName : document.getElementById("LastName").value,
                        DepartmentID : document.getElementById("depa").value,
                      };
    
    
        let fectParams = { method : 'PUT',
                           body : JSON.stringify(obj),
                           headers : { "Content-Type" : "application/json"} 
                           };
    
         let resp = await fetch("https://localhost:44347/api/Employee/" + ExtendEmp, fectParams);
         let status =  await resp.json();

         window.location.href = "employees.html"
         ActionTracker();
        }
        


async function getShiftID()
        {
            const urlParams = new URLSearchParams(window.location.search);
            ExtendEmp = urlParams.get('ExtendEmp');
        
            let resp =  await fetch("https://localhost:44347/api/Employee/" + ExtendEmp);
            let data = await resp.json();

            document.getElementById("xname").innerText = data.FirstName + " " + data.LastName;
            document.getElementById("xname").value = data.ID;
            
            let resp2 = await fetch("https://localhost:44347/api/Shift");
            let datas = await resp2.json();
        
            datas.forEach(ExtendShft => {
                
                let opDepObj = document.createElement("option");

                opDepObj.innerText = ExtendShft.ID + " " + ExtendShft.StartTime + ":00-" + ExtendShft.EndTime + ":00  Date:" + ExtendShft.Date;
                opDepObj.value = ExtendShft.ID;

                document.getElementById('shiftid').appendChild(opDepObj);
            });
            ActionTracker();
        }

async function addNewShift()
{
    const urlParams = new URLSearchParams(window.location.search);
    ExtendShft = urlParams.get('ExtendShft');

    let obj = { employeeid : document.getElementById("xname").value,
                ShiftID : document.getElementById("shiftid").value, 
             };

    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

     let resp = await fetch("https://localhost:44347/api/Empshift", fectParams);
     let status =  await resp.json();
     
     window.location.href = "employees.html"
     ActionTracker()
}


async function LoadShifts()
    {
        let resp = await fetch("https://localhost:44347/api/Shift");
        let data = await resp.json();

        data.forEach((ExtendShftEmp) => {

            let tdShiftIDObj = document.createElement("td");
            let tdDateObj = document.createElement("td");
            let tdHoursObj = document.createElement("td");
            let tdEmpsObj = document.createElement("td");
            
            tdShiftIDObj.innerText = ExtendShftEmp.ID;
            tdDateObj.innerText = ExtendShftEmp.Date
            tdHoursObj.innerText = ExtendShftEmp.StartTime + ":00-" + ExtendShftEmp.EndTime + ":00";
            
            
            let ulEmpsObj = document.createElement("ul");
                for (let i = 0; i < ExtendShftEmp.ExtendShiftz.length; i++)
                {
                    let liNameObj = document.createElement("li");

                    let aNameObj = document.createElement("a");
                    aNameObj.innerText = ExtendShftEmp.ExtendShiftz[i].FirstName + " " + ExtendShftEmp.ExtendShiftz[i].LastName;
                    aNameObj.onclick = function gotoeditID()
                    {
                        clicked = true;
                        if(clicked = true)
                        {
                           aNameObj.href = window.location.href = "employee.html?ExtendEmp=" + ExtendShftEmp.ExtendShiftz[i].EmployeeID;
                        }
                    };
                    
                    liNameObj.appendChild(aNameObj);
                    ulEmpsObj.appendChild(liNameObj);
                    tdEmpsObj.appendChild(ulEmpsObj);
                };

            let trObj = document.createElement("tr");

            trObj.appendChild(tdShiftIDObj);
            trObj.appendChild(tdDateObj);
            trObj.appendChild(tdHoursObj);
            trObj.appendChild(tdEmpsObj);
            
            document.getElementById('tbl3').appendChild(trObj);
        });

        let btCreateSObj = document.createElement("button");
            btCreateSObj.innerText = "Create new Shift";
            var clicked2 = false;
            btCreateSObj.onclick = function GotoCreateShift()
            {
                clicked2 = true;
                if(clicked2 = true)
                {
                    window.location.href = "createshift.html";
                }
            };

            document.getElementById('gotocreate').appendChild(btCreateSObj);
    }



async function createNewShift()
{
    const urlParams = new URLSearchParams(window.location.search);
    ExtendEmpShft = urlParams.get('ExtendShft');

    let obj = { date : document.getElementById("dateT").value,
                StartTime : document.getElementById("startT").value, 
                EndTime : document.getElementById("endT").value, 
             };

    let fectParams = { method : 'POST',
                        body : JSON.stringify(obj),
                        headers : { "Content-Type" : "application/json"} 
    };

     let resp = await fetch("https://localhost:44347/api/Shift", fectParams);
     let status =  await resp.json();
    
     window.location.href = "shifts.html"
     ActionTracker()
}








