const search = document.getElementById("search");
const input = document.getElementById("input");


search.addEventListener("click", function () {
    if (input.value === "") {
        alert("Please input meal name!!!")
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(response => response.json())
            .then(data => {
                const meals = data.meals;
                // console.log(meals);
                for (let i = 0; i < meals.length; i++) {
                    const meal = meals[i];
                    // console.log(meal);
                    var mealName = meal.strMeal;
                    const div = document.createElement("div");
                    div.className = "meal h-100";
                    div.innerHTML = `
                        <div class="card result text-center h-100" >
                            <img src="${meal.strMealThumb}" class="card-img-top"alt="...">
                            <div class="card-body">
                                <h5 class="card-title "> ${mealName} </h5>
                                <div id="ing" class="card h-100">
                                    
                                </div>
                            </div>
                        </div>    
                    `;




                    const allMeals = document.getElementById("meals");
                    allMeals.appendChild(div);
                    const searchHistory = document.getElementById("input-value");
                    searchHistory.innerHTML = `Showing result for: <b>${input.value}</b>`

                    search.addEventListener("click", function () {
                        allMeals.innerText = "";
                    })
                    input.addEventListener("click", function () {
                        input.value = "";
                    })

                }
                function showDetail() {

                    const card = document.getElementsByClassName("result");
                    for (let i = 0; i < card.length; i++) {
                        const perCard = card[i];
                        perCard.addEventListener("click", function () {
                            // console.log(perCard, "card clicked");
                            const ing = document.getElementById("ing");
                            ing.innerHTML = `${perCard.innerHTML}
                                <b>Ingredients</b>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            `
                            ing.style.display = "block"
                            document.getElementById("details").appendChild(ing);


                        })
                    }
                }
                showDetail();

            })
    }
})
