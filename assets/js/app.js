//=============================================== Load Basic Information of Phones ===============================================
const search = () =>{
    let inputValue = document.getElementById('input-value').value;
    document.getElementById('input-value').value='';  
    toggleSpinner('block');
    console.log('clicked')
    displayStartup(false);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => displayResult(data))    
}

const displayResult = (data) =>{
    let resultData = data.data;
    console.log(resultData.length);
    let resultStatus = data.status;

    let dataSet = resultData.slice(0,20);    
    let dataSet2 = resultData.slice(20,resultData.length);  

    if(resultStatus==true){
        noResults(false);
        removeResults(true);  
        if(resultData.length>20){
            onDisplay(true);
        }
        else{
            onDisplay(false);
        }
        // For Data Set-1 (First 20 Results)
        for(const singleData of dataSet){
            console.log(singleData.phone_name);            
            let phoneName = singleData.phone_name;
            let brandName = singleData.brand;
            let imgUrl = singleData.image;
            let slug = singleData.slug;
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
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" shadow" id="show-more-btn" onclick="loadDetails('${slug}')">Learn More <i class="fas fa-caret-right"></i></button>
                    </div>
                </div>
            `
            document.getElementById('row').appendChild(newDiv);
            toggleSpinner('none');
        }
        // For Data Set-2 (Rest of the Results)
        for(const singleData of dataSet2){
            console.log(singleData.phone_name);            
            let phoneName = singleData.phone_name;
            let brandName = singleData.brand;
            let imgUrl = singleData.image;
            let slug = singleData.slug;
            let newDiv = document.createElement('div');
            newDiv.classList.add('data-set-2');
            newDiv.classList.add('col');
            newDiv.innerHTML=`
                <div class="card h-100 shadow">
                    <img src="${imgUrl}" class="card-img-top mt-3 mb-3" alt="Image of ${phoneName}" title="${phoneName}">
                    <div class="card-body">
                        <h5 class="card-title">${phoneName}</h5>
                        <p class="card-text"><strong>Brand:</strong> ${brandName}</p>
                    </div>
                    <div class="ms-4 mb-4">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" shadow" id="show-more-btn" onclick="loadDetails('${slug}')">Learn More <i class="fas fa-caret-right"></i></button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><strong>Release Date:</strong> Nothing to show</small>
                    </div>
                </div>
            `
            document.getElementById('row').appendChild(newDiv);
            toggleSpinner('none');
        }
    }
    else{
        noResults(true);
        removeResults(true);
        toggleSpinner('none');
    }    
}

const displayRestResults = () =>{
    // document.getElementById('data-set-2').style.display='block';
    let dataSet2 = document.getElementsByClassName('data-set-2');
    for(const data of dataSet2){
        data.style.display='block';
    }
    document.getElementById('more-results-btn').style.display='none';
}

//============================================ Load Detailed Specification of Phones ============================================
const loadDetails = (singlePhone) =>{
    console.log(singlePhone)
    fetch(`https://openapi.programming-hero.com/api/phone/${singlePhone}`)
        .then(response => response.json())
        .then(data => displaySpecs(data))
}

const displaySpecs = (specificationData) =>{
    console.log(specificationData.data)
    toggleSpinner('block');
    let specifications = specificationData.data;
    const {name} = specifications;
    const {storage, displaySize, chipSet, memory, sensors} = specifications.mainFeatures;
    const {WLAN, Bluetooth, GPS, NFC, Radio, USB} = specifications.others;
    // const {releaseDate} = specifications.releaseDate;
    const releaseOn = specifications.releaseDate ? specifications.releaseDate : "No Data To Show";
    // let releaseOn = releaseDate;
    // if(releaseDate == undefined){
    //     releaseDate = "No data to show";
    // }
    // else{
    //     return releaseDate;
    // }
    let modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('modal-content');    
    modalContentDiv.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">${name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table class="table table-striped">
                <tr>
                    <td><strong>Storage:</strong></td>
                    <td>${storage}</td>
                </tr>
                <tr>
                    <td><strong>Display Size:</strong></td>
                    <td>${displaySize}</td>
                </tr>
                <tr>
                    <td><strong>Chip Set:</strong></td>
                    <td>${chipSet}</td>
                </tr>
                <tr>
                    <td><strong>Memory:</strong></td>
                    <td>${memory}</td>
                </tr>
                <tr>
                    <td><strong>Sensors:</strong></td>
                    <td>${sensors}</tr>
                <tr>
                    <td><strong>WLAN:</strong></td>
                    <td>${WLAN}</td>
                </tr>
                <tr>
                    <td><strong>Bluetooth:</strong></td>
                    <td>${Bluetooth}</td>
                </tr>
                <tr>
                    <td><strong>GPS:</strong></td>
                    <td>${GPS}</td>
                </tr>
                <tr>
                    <td><strong>NFC:</strong></td>
                    <td>${NFC}</td>
                </tr>
                <tr>
                    <td><strong>Radio:</strong></td>
                    <td>${Radio}</td>
                </tr>
                <tr>
                    <td><strong>USB:</strong></td>
                    <td>${USB}</td>
                </tr>
                <tr>
                    <td><strong>Release Date:</strong></td>
                    <td>${releaseOn}</td>
                </tr>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    `
    document.getElementById('modal-dialog').innerHTML="";
    document.getElementById('modal-dialog').appendChild(modalContentDiv);
    toggleSpinner('none');
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

// Functions for displaying button to load more results
const onDisplay = status =>{
    if(status==true){
        document.getElementById('more-results-btn').style.display='block';
    }
    else{
        document.getElementById('more-results-btn').style.display='none';
    }
}

// Functions for displaying spinner 
const toggleSpinner = displayStatus =>{
    document.getElementById('spinner').style.display=displayStatus;
}


