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
    for(const singleData of resultData){
        console.log(singleData.phone_name);
        let phoneName = singleData.phone_name;
        let brandName = singleData.brand;
        let imgUrl = singleData.image;
        let newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML=`
            <div class="card h-100 shadow">
                <img src="${imgUrl}" class="card-img-top img-thumbnail width-25" alt="Image of ${phoneName}">
                <div class="card-body">
                    <h5 class="card-title">${phoneName}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                </div>
                <div class="ms-4 mb-4">
                    <button type="button" class="btn btn-outline-primary shadow" id="show-more-btn">Show More</button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Release Date: Nothing to show</small>
                </div>
            </div>
        `
        document.getElementById('row').appendChild(newDiv);

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

