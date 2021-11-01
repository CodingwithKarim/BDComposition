const submit = document.querySelectorAll(".submit");
const weeklyGoal = document.querySelector(".goal")
const targetWeight = document.querySelector(".target")
const yourage = document.querySelector(".age")

Array.from(submit).forEach(function (element) {
  element.addEventListener("click", function (e) {
    const weight = parseInt(e.target.dataset.weight)
    const height = parseFloat(e.target.dataset.height)
    const age = parseInt(yourage.value)
    const estBMR = weight * 15
    const goalWeight = parseInt(targetWeight.value)
    const diet = estBMR + (500 * weeklyGoal.value)
    const estTime = Math.abs((weight - goalWeight)) / Math.abs(weeklyGoal.value)
    const name = e.target.dataset.name
    console.log(weight, age, height, estBMR, goalWeight, diet, estTime)
    fetch("plan", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        'age': age,
        'estBMR': estBMR,
        'diet': diet,
        'estTime' :estTime,
        'weight': weight,
        'height': height,
        'name' : name,
        'goalWeight': goalWeight
    }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })

      .then((data) => {
        console.log(data);
        window.location.reload(true)
      });
  });
});
