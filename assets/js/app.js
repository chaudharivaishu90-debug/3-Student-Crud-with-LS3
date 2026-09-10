var cl=console.log;
const Userdata=document.getElementById("Userdata");
const Form=document.getElementById("Form");
const name=document.getElementById("name");
const Email=document.getElementById("Email");
const Contact=document.getElementById("Contact");
const submit=document.getElementById("submit");
const update=document.getElementById("update");


// let contactArr=[{id:"112",name:"Bhargav",email:"Bhargav@gmail.com",contact:"9878788543"}];

// localStorage.setItem("contactArr",JSON.stringify(contactArr));

let contactArr=JSON.parse(localStorage.getItem("contactArr")) || [{id:"112",name:"Bhargav",email:"Bhargav@gmail.com",contact:"9878788543"}];
cl(contactArr);

function showtable(eve){
	let result=``;
	eve.forEach((element,i) => {
		result+=`<tr id="${element.id}">
                                <td>${i+1}</td>
                                <td>${element.name}</td>
                                <td>${element.email}</td>
                                    <td>${element.contact}</td>


                                <td>                   
                                 <i  onclick="OnEdt(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                                <td><i  onclick="Ondlt(this)" class="fa-regular fa-trash-can fa-2x text-danger"></i></td>
                            </tr>
		`
	});
    		Userdata.innerHTML=result;

}
showtable(contactArr)

//create
function CreateTable(ele){
	
	let tr=document.createElement("tr");
		tr.id=ele.id;

	tr.innerHTML+=`<td>${contactArr.length}</td>
                                <td>${ele.name}</td>
                                <td>${ele.email}</td>
                                    <td>${ele.contact}</td>


                                <td>                   
                                 <i onclick="OnEdt(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                                <td><i onclick="Ondlt(this)" class="fa-regular fa-trash-can fa-2x text-danger"></i></td>
`
Userdata.append(tr);
Swal.fire({
			title:" data Created",
			timer:2000,
			icon:"success"
		});


}

//Edit
function OnEdt(ele){
	let EditID= ele.closest("tr").id;
	EDobj=contactArr.find(e=>e.id===EditID);
	name.value=EDobj.name
		Email.value=EDobj.email
			Contact.value=EDobj.contact
	submit.classList.add("d-none")
	update.classList.remove("d-none")
	localStorage.setItem("EditID",EditID);



}

//update
	
function oupHandler(event){
	let UpdateId= localStorage.getItem("EditID");
		localStorage.removeItem("EditID");
		let index= contactArr.findIndex(t=>t.id===UpdateId);
		
	contactArr[index]={
        id:UpdateId,
		name:name.value,
        email:Email.value,
        contact:Contact.value

		}
let td=document.getElementById(UpdateId).children
td[1].innerHTML=name.value,
td[2].innerHTML=Email.value,
td[3].innerHTML=Contact.value,

submit.classList.remove("d-none");
update.classList.add("d-none");
 localStorage.setItem("contactArr",JSON.stringify(contactArr));

Form.reset();
Swal.fire({
			title:" data updated",
			timer:2000,
			icon:"success"
		});

}


function Ondlt(ee){
	let getconfirm=confirm("Want to remove??")
	if(getconfirm){
let removeId=ee.closest("tr").id;
	let index=contactArr.findIndex(t=>t.id===removeId);
	contactArr.splice(index,1);
		ee.closest("tr").remove();
		let td=[...document.querySelectorAll("#Userdata tr td:first-child")]
		td.forEach((element,i )=> {
			element.innerHTML=i+1;
             localStorage.setItem("contactArr",JSON.stringify(contactArr));


		});
		Swal.fire({
			title:" data Delete",
			timer:2000,
			icon:"success"
		});

	}
	}


function Onhandler(e){
	e.preventDefault();
	let obj={
		id:crypto.randomUUID(),
		name:name.value,
        email:Email.value,
        contact:Contact.value

	}
	contactArr.push(obj)
	CreateTable(obj);
    localStorage.setItem("contactArr",JSON.stringify(contactArr));

	Form.reset();


}





Form.addEventListener("submit",Onhandler);
update.addEventListener("click",oupHandler);