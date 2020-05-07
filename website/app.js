const API_KEY = "75aa1a71465a5e1d1188620aa26ac98a";
/*
 when use 'http://api.openweathermap.org/data/2.5/weather?zip='
 an error appears
    Access to fetch at 'http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=75aa1a71465a5e1d1188620aa26ac98a' 
    from origin 'http://localhost:3000' has been blocked by CORS policy
  --> Then I researched and found this solution:
    to put this url 'https://cors-anywhere.herokuapp.com/' in front of the initial URL
*/
const baseUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=";

const generateButton = document.getElementById("generate");
const spinnerImg = document.querySelector(".spinner");

// helper method
const fetchParams = (method = 'GET', data = {}) => {
    const params = {
        method: method,
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if(method == 'POST') {
        params["body"] = JSON.stringify(data);
    }

    return params;
}

// Async GET
const retrieveData = async (url = '', zipCode, ApiAPI_KEY) => {
    url = `${url + zipCode}&appid=${ApiAPI_KEY}`;
    const response = await fetch(url, fetchParams());
    try {
        const responseAsJson = await response.json();
        return responseAsJson;
    } catch (error) {
        console.log("error", error);
    }
};

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, fetchParams('POST', data));
    try {
      const responseData = await response.json();
      return responseData;
    }catch(error) {
    console.log("error", error);
    }
};

const updateUI = async () => {
    const response = await fetch('/all', fetchParams());
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

function performAction () {
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
            console.log(response)
            console.log(data)
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