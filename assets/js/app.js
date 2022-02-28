const search = () =>{
    let inputValue = document.getElementById('input-value').value;  
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => displayResult(data))    
}

const displayResult = (data) =>{
    let resultData = data.data;
    let resultStatus = data.status;
    console.log(resultStatus);
    // console.log(resultData);
    if(resultStatus==true){
        document.getElementById('row').innerHTML="";
        document.getElementById('no-results-msg').innerText="";
        for(const singleData of resultData){
            console.log(singleData.phone_name);
            
            let phoneName = singleData.phone_name;
            let brandName = singleData.brand;
            let imgUrl = singleData.image;
            let newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML=`
                <div class="card h-100 shadow">
                    <img src="${imgUrl}" class="card-img-top mt-3 mb-3" alt="Image of ${phoneName}" title="${phoneName}">
                    <div class="card-body">
                        <h5 class="card-title">${phoneName}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div class="ms-4 mb-4">
                        <button type="button" class="btn btn-outline-primary shadow" id="show-more-btn">Learn More <i class="fas fa-caret-right"></i></button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Release Date: Nothing to show</small>
                    </div>
                </div>
            `
            document.getElementById('row').appendChild(newDiv);
        }
    }
    else{
        document.getElementById('no-results-msg').style.display='block';
    }


    // if(resultStatus == true){
        // console.log(result)
        // document.getElementById('no-results').style.display='none';
        // document.getElementById('stand-img').style.display='block';
        // for(const singleData in resultData){
        //     console.log(singleData)
        // }

    // }
    // else{
        // console.log(result)
        // document.getElementById('no-results').style.display='block';
        // document.getElementById('stand-img').style.display='none';
    // }
}

