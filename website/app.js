const API_KEY = "75aa1a71465a5e1d1188620aa26ac98a&units=imperial";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const generateButton = document.getElementById("generate");
const spinnerImg = document.querySelector(".spinner");



// Async GET
const retrieveData = async (url = '', zipCode, API_KEY) => {
    url = `${url + zipCode}&appid=${API_KEY}`;
    const response = await fetch(url);
    try {
        const responseAsJson = await response.json();
        console.log(responseAsJson);
        return responseAsJson;
    } catch (error) {
        console.log("error", error);
    }
};

// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const response = await fetch('/all');
    try {
        const responseAsJson = await response.json()
        // update new entry values
        document.getElementById('date').innerHTML = "<b>date: </b>" + responseAsJson.date;
        document.getElementById('temp').innerHTML = "<b>temp: </b>" + responseAsJson.temperature;
        document.getElementById('content').innerHTML = "<b>Content: </b>" + responseAsJson.userResponse;

        spinnerImg.classList.add("hide");
        generateButton.removeAttribute("disabled");
    }
    catch (error) {
        console.log("error", error);
    }
};

function performAction() {
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;
    const date = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    generateButton.setAttribute("disabled", true);
    spinnerImg.classList.remove("hide");

    retrieveData(baseUrl, zip, API_KEY)
        .then((response) => {
            const data = {
                date,
                temperature: response.main.temp,
                userResponse: content
            };
            postData('/add', data);
        })
        .then(() => {
            updateUI();
        })
        .catch((error) => {
            console.log(error)
        })
}
generateButton.addEventListener("click", performAction);