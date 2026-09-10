// var cl=console.log;
// const MovieData=document.getElementById("MovieData");
// const form=document.getElementById("form");
// const nameInput=document.getElementById("nameInput");
// const review=document.getElementById("review");
// const rating=document.getElementById("rating");
// const submit=document.getElementById("submit");
// const update=document.getElementById("update");


// let MoveNmaearr=[{id:"111",movieName:"3 Idiot",Review:"Good",Rating:"5"}];

//  localStorage.setItem("MoveNmaearr",JSON.stringify(MoveNmaearr));

let MoveNmaearr=JSON.parse(localStorage.getItem("MoveNmaearr"))||[];



//database
function ShowUi(para) {
	let result=``;
	para.forEach((ele,i)=> {
		result+=` <tr id="${ele.id}">
                            <td>${i+1}</td>
                            <td>${ele.movieName}</td>
                            <td>${ele.Review}</td>
                            <td>${ele.Rating}</td>
                            <td> <i  onclick="onEdittr(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                            <td><i onclick="onRemove(this)" class="fa-regular fa-trash-can fa-2x text-danger"></i></td>
                        </tr>
		`
		MovieData.innerHTML=result;
	});
	
}
ShowUi(MoveNmaearr);

//create
function CreateMovie(obj){
let tr=document.createElement("tr");
tr.id=obj.id;
tr.innerHTML=`
                            <td>${MoveNmaearr.length}</td>
                            <td>${obj.movieName}</td>
                            <td>${obj.Review}</td>
                            <td>${obj.Rating}</td>
                            <td> <i  onclick="onEdittr(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                            <td><i onclick="onRemove(this)"class="fa-regular fa-trash-can fa-2x text-danger"></i></td>
    
		`;
		MovieData.append(tr);
		Swal.fire({
			title:" data Created",
			timer:2000,
			icon:"success"
		});
}




//Edit
function onEdittr(e){
	let Editid= e.closest("tr").id;
	let objfind=MoveNmaearr.find(t=>t.id===Editid);
	nameInput.value=objfind.movieName;
	review.value=objfind.Review;
	rating.value=objfind.Rating;
	submit.classList.add("d-none");
	update.classList.remove("d-none");
	localStorage.setItem("Editid",Editid);

}

//update
function onupdateBtn(event){
	let UpdateId= localStorage.getItem("Editid")
		localStorage.removeItem("Editid");
		let index= MoveNmaearr.findIndex(t=>t.id===UpdateId);
		
	MoveNmaearr[index]={
		id:UpdateId,
		movieName:nameInput.value,
		Review:review.value,
		Rating:rating.value
}
let td=document.getElementById(UpdateId).children;
td[1].innerHTML=nameInput.value;
td[2].innerHTML=review.value;
td[3].innerHTML=rating.value;
submit.classList.remove("d-none");
update.classList.add("d-none");
	localStorage.setItem("MoveNmaearr",JSON.stringify(MoveNmaearr));

form.reset();
Swal.fire({
			title:" data updated",
			timer:2000,
			icon:"success"
		});

}


//delete
function onRemove(ee){
	let confirmation=confirm("Are sure To delete??")
	if(confirmation){
	let removeID=ee.closest("tr").id;
	let index=MoveNmaearr.findIndex(t=>t.id===removeID);
	MoveNmaearr.splice(index,1);
	
	ee.closest("tr").remove();
	let td=[...document.querySelectorAll("#MovieData tr td:first-child")];
	td.forEach((ele,i)=>{
		ele.innerHTML=i+1;
			localStorage.setItem("MoveNmaearr",JSON.stringify(MoveNmaearr));

	});
	}
Swal.fire({
			title:" data Deleted",
			timer:2000,
			icon:"success"
		})

}





function onclickhanlder(p){
	p.preventDefault();
	let obj={
		id:crypto.randomUUID(),
		movieName:nameInput.value,
		Review:review.value,
		Rating:rating.value
	}
	MoveNmaearr.push(obj);
	CreateMovie(obj);
	localStorage.setItem("MoveNmaearr",JSON.stringify(MoveNmaearr));


	form.reset();
}

form.addEventListener("submit",onclickhanlder);
update.addEventListener("click",onupdateBtn);