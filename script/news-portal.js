
// Element ID's that will be initially invisible
document.getElementById('loading-spinner').style.display = 'none';
document.getElementById('news-error-title').style.display = 'none';
document.getElementById('news-portal-footer').style.display = 'none';
document.getElementById('news-found-number').style.display = 'none';

const loadCategoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryData(data.data.news_category))
    .catch( error => {
        document.getElementById('news-error-title').style.display = 'block';
    });
}

loadCategoryData();

const displayCategoryData = (newsCategories) => {
    //console.log(newsCategories);
    const uniqueArray = [];
    const getNewsCategoryDiv = document.getElementById('news-categories');
    newsCategories.forEach(newsCategory => {
        const {category_id, category_name} = newsCategory
        //console.log(newsCategory);
        if(uniqueArray.indexOf(category_name) === -1){
            uniqueArray.push(category_name);
            const makeNewsCategoryList = document.createElement('li');
            makeNewsCategoryList.classList.add('news-category-list');
            makeNewsCategoryList.innerHTML = `<a onclick ="newsCategoryAfterClick('${category_id}' , '${category_name}')">${category_name}</a>`;
            getNewsCategoryDiv.appendChild(makeNewsCategoryList);
        }
        
    })

}


const newsCategoryAfterClick = (categoryId, categoryName) => {
    //console.log(categoryId);
    //console.log(categoryName)

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showNewsCategoryWise(data.data, categoryName))
    .catch( error => {
        document.getElementById('news-error-title').style.display = 'block';
    });

    //Loading Spinner Visible
    document.getElementById('loading-spinner').style.display = 'block';
 
}


// const showNewsCategoryWise = (categories, categoryName) => {
//     //console.log(categories)
//     //console.log(categoryName)
  
//     //Sorting the News Categories  on basis of total-view in descending order 
//     categories.sort(
//         (a,b) => b.total_view - a.total_view
//     );

//     const getNewsContainer = document.getElementById('news-category-container');
//     const getNewsNumberDiv = document.getElementById('news-found-number');
//     getNewsContainer.innerHTML = '';
//     getNewsNumberDiv.innerHTML = '';

//     document.getElementById('loading-spinner').style.display = 'block';
//     document.getElementById('news-portal-footer').style.display = 'block';
//     document.getElementById('news-found-number').style.display = 'block';

//     getNewsNumberDiv.innerHTML = `<h5 class="text-white">${categories.length > 0 ? categories.length : "No" } News Found For Category ${categoryName}</h5>`;

//     categories.forEach(category => {
//         //console.log(category);
//         //console.log(category._id);
//         const {title, details, total_view, thumbnail_url, _id} = category;

//         const makeNewsContainerDiv = document.createElement('div');
//         makeNewsContainerDiv.innerHTML = `
//         <div class="card mb-4  w-full mx-auto shadow-lg rounded-5 container">
//                 <div class="row g-3">
//                   <div class="col-md-4">
//                     <img src="${thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
//                   </div>
//                   <div class="col-md-8">
//                     <div class="card-body">
//                       <h5 class="card-title fw-bold">${title}</h5>
//                       <p class="card-text text-muted">${details.length > 250 ? details.slice(0,250) + '...' :details }</p>

//                         <div class="d-flex justify-content-between align-items-center"> 
                        
//                             <div  class="me-4">
//                                 <img id="" src="${category.author.img ? category.author.img : "Image Not Found"}" alt="" title ="Author Image" class="mt-5 img-fluid news-category-author-image d-block">
                                    
//                                 <span title ="Author Name" class="card-text d-block"><small class=" text-primary fw-bold">${category.author.name ? category.author.name : "<span class='text-danger'>Name Not Found</span>" }</small></span>

//                                 <span title ="News Publish Date" class="card-text "><small class="text-muted">${category.author.published_date? category.author.published_date.slice(0,10) : "<span class='text-danger fw-semibold'>Publish Date Not Found</span>"}</small></span>
//                             </div>

                                
//                             <div class=" ms-3 d-flex justify-content-between align-items-center news-view me-4 news-view-count" title ="Total View">
                                        
//                                 <i class="fa-solid fa-eye"> </i>
//                                 <h6 class="text-center text-primary fw-semibold px-2 mt-2" title ="Total Views">${category.total_view ? category.total_view : "<span class = 'text-danger fw-semibold'>No Data Found</span>" }</h6>
                                        
//                             </div>


//                             <div class="mt-5 ">
//                                 <div class="news-rating d-flex mt-5" title ="Rating">
//                                     <i class="fa-solid fa-star me-2"></i>
//                                     <i class="fa-regular fa-star-half-stroke me-2"></i>
//                                     <i class="fa-regular fa-star me-2"></i>
//                                     <i class="fa-regular fa-star me-2"></i> 
//                                     <i class="fa-regular fa-star me-2"></i> 
//                                 </div>
//                             </div>

                                   
//                             <div class="mt-5 ms-5"> 
//                                 <button onclick ="newsDetailsOnModal('${_id}')" title ="View Full News" class=" mt-5 d-flex flex-sm-column-reverse flex-md-column-reverse mt-4 btn btn-primary"  data-bs-toggle="modal" data-bs-target="#newsDetailsModal"><i class="fa-solid fa-arrow-right fs-5"></i></button>
//                             </div>

                                
//                         </div>
                     
//                     </div>
//                   </div>
//                 </div>
//         </div>`;
//         getNewsContainer.appendChild(makeNewsContainerDiv);
//     })

//     document.getElementById('loading-spinner').style.display = 'none';
//     const getQuestionSection = document.getElementById('question-answer-section');
//     getQuestionSection.classList.add('d-none');

// }










const showNewsCategoryWise = (categories, categoryName) => {
    //console.log(categories)
    //console.log(categoryName)
  
    //Sorting the News Categories  on basis of total-view in descending order 
    categories.sort(
        (a,b) => b.total_view - a.total_view
    );

    const getNewsContainer = document.getElementById('news-category-container');
    const getNewsNumberDiv = document.getElementById('news-found-number');
    getNewsContainer.innerHTML = '';
    getNewsNumberDiv.innerHTML = '';

    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('news-portal-footer').style.display = 'block';
    document.getElementById('news-found-number').style.display = 'block';

    getNewsNumberDiv.innerHTML = `<h5 class="text-white">${categories.length > 0 ? categories.length : "No" } News Found For Category ${categoryName}</h5>`;

    categories.forEach(category => {
        //console.log(category);
        //console.log(category._id);
        const {title, details, total_view, thumbnail_url, _id} = category;

        const makeNewsContainerDiv = document.createElement('div');
        makeNewsContainerDiv.innerHTML = `
        <div class="card mb-4  w-full  shadow-lg rounded-5 container">
                <div class="row g-3">
                  <div class="col-md-4">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">${title}</h5>
                      <p class="card-text text-muted">${details.length > 250 ? details.slice(0,250) + '...' :details }</p>

                        <div class="d-flex  align-items-center justify-content-lg-between justify-content-md-between main-div"> 
                        
                            <div  class="me-4">
                                <img id="" src="${category.author.img ? category.author.img : "Image Not Found"}" alt="" title ="Author Image" class="mt-5 img-fluid news-category-author-image d-block">
                                    
                                <span title ="Author Name" class="card-text d-block"><small class=" text-primary fw-bold">${category.author.name ? category.author.name : "<span class='text-danger'>Name Not Found</span>" }</small></span>

                                <span title ="News Publish Date" class="card-text "><small class="text-muted">${category.author.published_date? category.author.published_date.slice(0,10) : "<span class='text-danger fw-semibold'>Publish Date Not Found</span>"}</small></span>
                            </div>

                                
                            <div class = " ms-5 d-flex flex-row flex-lg-row flex-md-row fahim">

                                <div class="d-flex justify-content-between align-items-center news-view news-view-count yellow-div" title ="Total View">
                                            
                                    <i class="fa-solid fa-eye"> </i>
                                    <h6 class="text-center text-primary fw-semibold px-2 mt-2" title ="Total Views">${category.total_view ? category.total_view : "<span class = 'text-danger fw-semibold'>No Data Found</span>" }</h6>
                                            
                                </div>


                                
                                <div class="mt-5">
                                    <div class=" news-rating d-flex mt-5 me-2 " title ="Rating">
                                        <i class="fa-solid fa-star mt-2"></i>
                                        <i class="fa-regular fa-star-half-stroke mt-2"></i>
                                        <i class="fa-regular fa-star mt-2"></i>
                                        <i class="fa-regular fa-star mt-2"></i> 
                                        <i class="fa-regular fa-star mt-2 "></i> 
                                    </div> 
                                </div>
                                

                                   
                                <div class="mt-5 "> 
                                    <button onclick ="newsDetailsOnModal('${_id}')" title ="View Full News" class=" mt-5 btn btn-primary"  data-bs-toggle="modal" data-bs-target="#newsDetailsModal"><i class="fa-solid fa-arrow-right fs-5"></i></button>
                                </div>

                            </div>

                                
                        </div>
                     
                    </div>
                  </div>
                </div>
        </div>`;
        getNewsContainer.appendChild(makeNewsContainerDiv);
    })

    document.getElementById('loading-spinner').style.display = 'none';
    const getQuestionSection = document.getElementById('question-answer-section');
    getQuestionSection.classList.add('d-none');

}

















// Code after clicking the blog to show the question and answers
document.getElementById('news-blog').addEventListener('click', function(){

    document.getElementById('news-found-number').style.display = 'none';
    const getNewsContainer = document.getElementById('news-category-container');
    const getNewsNumberDiv = document.getElementById('news-found-number');
    getNewsContainer.innerHTML = '';
    getNewsNumberDiv.innerHTML = '';

    const getQuestionSection = document.getElementById('question-answer-section');
    getQuestionSection.classList.remove('d-none');
    document.getElementById('news-portal-footer').style.display = 'block';
})



const newsDetailsOnModal = (newsId) => {
    //console.log("News Id:", newsId);

    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
    .then (res => res.json())
    .then(data => displayNewsDetailsOnModal(data.data[0]))
}


const displayNewsDetailsOnModal = (newsDetails) => {
    console.log(newsDetails);

    const {category_id, details, image_url, title, total_view} = newsDetails;
    const getModalNewsTitle = document.getElementById('newsDetailsModalLabel');
    getModalNewsTitle.innerText = title;

    const getModalBody = document.getElementById('modal-body-area');
    getModalBody.innerHTML = `
    <img id="" src="${image_url ? image_url : "Image Not Found"}" alt="" class="img-fluid">

    <div class="d-flex justify-content-between"> 

        <p class="text-primary modal-publish-date">Published Date: ${newsDetails.author.published_date ? newsDetails.author.published_date.slice(0,10) : "<span class='text-danger fw-bold'>Published Date Not Found</span>" }</p>
    
        <div class=" ms-3 d-flex me-4  mt-4">                      
            <i class="fa-solid fa-eye modal-eye"> </i>
            <h6 class="text-center text-primary modal-view fw-semibold px-2">${total_view ? total_view : "<span class = 'text-danger fw-semibold'>No Data Found</span>" }</h6>                         
        </div>

    </div>
    

    <p class="mt-2 text-dark">${details.length > 500 ? details.slice(0,500) + '...' :details}</p>
    <div class="text-center">
        <img id="" class="author-image-modal" src="${newsDetails.author.img ? newsDetails.author.img : "Image Not Found"}" alt="" class="img-fluid"> 
    </div>
    <p class="text-primary d-flex justify-content-center">${newsDetails.author.name ? newsDetails.author.name : "<span class='text-danger fw-bold'>Author Name Not Found</span>" }</p>

    <div class="news-rating d-flex justify-content-center">
       <span> Rating:   </span> 
       <div  class="news-rating-modal d-flex">
            <i class="fa-solid fa-star me-2"></i>
            <i class="fa-regular fa-star-half-stroke me-2"></i>
            <i class="fa-regular fa-star me-2"></i>
            <i class="fa-regular fa-star me-2"></i> 
            <i class="fa-regular fa-star me-2"></i> 
       </div>
    </div>`;
    
}



