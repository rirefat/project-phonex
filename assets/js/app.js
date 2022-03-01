const search = () =>{
    let inputValue = document.getElementById('input-value').value;  
    console.log('clicked')
    displayStartup(false);
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
        noResults(false);
        removeResults(true);
        
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
                        <p class="card-text"><strong>Brand:</strong> ${brandName}</p>
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
        noResults(true);
        removeResults(true);
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


//======================================================== All Functions ========================================================
// Functions for displaying startup image
const displayStartup = (isTrue) =>{
    if(isTrue == true){
        document.getElementById('startup-img').style.display='block';
        console.log('clicked true');
    }
    else{
        document.getElementById('startup-img').style.display='none';
        console.log('clicked false');
    }
}

// Functions for displaying no results output
const noResults = (isTrue) =>{
    if(isTrue == true){
        document.getElementById('no-results').style.display='block';
    }
    else{
        document.getElementById('no-results').style.display='none';        
    }
}

// Functions for removing previous results
const removeResults = isTrue =>{
    if(isTrue == true){
        document.getElementById('row').innerHTML="";
    }
}