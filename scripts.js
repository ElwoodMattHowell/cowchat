import 'regenerator-runtime/runtime';
import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;
let button = document.getElementById("button");
let input = document.getElementById("input");
let response = document.getElementById("response");

input.addEventListener("keydown", function(e) {
  if (e.code ==="Enter") {
    main();
  }
});


async function main() {
  const client = axios.create({
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
  })

  let prompt = `Respond as a bored cow: ${input.value}`;

  const params = {
    "model": "gpt-3.5-turbo-instruct",
    "prompt": prompt,
    "max_tokens": 100,
    "temperature": .75
  }
  
  
  client.post("https://api.openai.com/v1/completions", params)
  .then((result) => {
    response.style.backgroundColor = "white";
    response.innerHTML = `<p>${result.data.choices[0].text}</p>`
    // console.log(result.data.choices[0].text);
  }).catch((err) => {
    console.log(err);
  })

  input.value = "";
}

// main()