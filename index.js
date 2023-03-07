const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll(".charKey").forEach((charKeyBtn) => {
  charKeyBtn.addEventListener("click", () => {
    input.value += charKeyBtn.dataset.value
  })
})

document.getElementById("clear").addEventListener("click", () => {
  input.value = ""
  input.focus()
})

input.addEventListener("keydown",  (ev) => {
  ev.preventDefault()
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
  }
  if (ev.key === "Enter") {
    calculate()
  }
})

document.getElementById("equal").addEventListener("click", calculate)

// ativar a funcao calcular para processar como console
function calculate() {
  resultInput.classList.remove("error")

  try {
    const result = eval(input.value)
    resultInput.value = result
  } catch(e) {
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
  }
}


//Botão de copiar para area de transferencia 
document.getElementById("copyToClipboard").addEventListener("click", (ev) => {
  const button = ev.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})


//Para alterar o tema de dark para ligth 
document.getElementById("themeSwitcher").addEventListener("click", () => {
  const themes = {
    dark: {
      bgColor: "#f1f5f9",
      borderColor: "#aaa",
      fontColor: "#212529",
      primaryColor: "#26834a",
      nextTheme: 'light'
    },
    light: {
      bgColor: "#212529",
      borderColor: "#666",
      fontColor: "#f1f5f9",
      primaryColor: "#4dff91",
      nextTheme: 'dark'
    }
  }

  const chosenTheme =  themes[main.dataset.theme]

  root.style.setProperty("--bg-color", chosenTheme.bgColor)
  root.style.setProperty("--border-color", chosenTheme.borderColor)
  root.style.setProperty("--font-color", chosenTheme.fontColor)
  root.style.setProperty("--primary-color", chosenTheme.primaryColor)
  main.dataset.theme = chosenTheme.nextTheme

})
