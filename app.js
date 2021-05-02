const search = document.getElementById("search");
const input = document.getElementById("input");

// Search button event handler..
search.addEventListener("click", function () {
    if (input.value === "") {
        alert("Please input meal name!!!")
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(response => response.json())
            .then(data => {
                const getData = data.meals;

                showResult(getData);
                showDetails();
                search.addEventListener("click", function () {
                    document.getElementById("meals").innerText = "";
                    document.getElementById("details").innerText = "";
                })
                input.addEventListener("click", function () {
                    input.value = "";
                })
                document.getElementById("footer").style.display = "block";
            })
    }
})

// Showing the search result..
function showResult(meals) {
    if (meals === null) {
        document.getElementById("details").innerHTML = `<i class="fas fa-times-circle"></i> Sorry, We couldn't find any matching meal !!`;
        document.getElementById("input-value").innerText = "";
    }
    else {
        meals.forEach(meal => {
            const div = document.createElement("div");
            div.className = "meal h-100";
            div.innerHTML = `
                <div class="card result text-center h-100 " >
                    <img src="${meal.strMealThumb}" class="card-img-top"alt="...">
                    <div class="card-body">
                        <h5 class="card-title "> ${meal.strMeal} </h5>
                        <p id= "area">${meal.strArea}</p>
                        <div id= "hiddenIngredient">
                            <b>Ingredients:</b>

                            <div id= "ingredient-list">
                            <i class="fas fa-check-square"></i> ${meal.strIngredient1}<br>
                            <i class="fas fa-check-square"></i> ${meal.strIngredient2}<br>
                            <i class="fas fa-check-square"></i> ${meal.strIngredient3}<br>
                            <i class="fas fa-check-square"></i> ${meal.strIngredient4}<br>
                            <i class="fas fa-check-square"></i> ${meal.strIngredient5}<br>
                            <i class="fas fa-check-square"></i> ${meal.strIngredient6}<br>
                            </div>
                          
                        </div>
                     
                    </div>
                </div>
                <div id= "ingredient" class="card">
                </div>    
            `;

            const allMeals = document.getElementById("meals");
            allMeals.appendChild(div);
            const searchHistory = document.getElementById("input-value");
            searchHistory.innerHTML = `Showing result for: <b>${input.value}</b>`
        });
    }
}

// showing the meal details..
function showDetails() {

    const card = document.getElementsByClassName("result");
    for (let i = 0; i < card.length; i++) {
        const eachCard = card[i];
        eachCard.addEventListener("click", function () {

            const ingredient = document.getElementById("ingredient");
            ingredient.innerHTML = eachCard.innerHTML
            document.getElementById("details").appendChild(ingredient);
            ingredient.style.display = "block"
            document.getElementById("hiddenIngredient").style.display = "block"
            document.getElementById("area").style.display = "none"


        })
    }
}
