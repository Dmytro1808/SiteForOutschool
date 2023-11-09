function toggleMenu() {
  const $burger = document.querySelector("#burger");
  const $menu = document.querySelector("#mobile-menu");
  const $body = document.querySelector("body");
  $burger.addEventListener("click", () => {
    $burger.classList.toggle("active");
    $menu.classList.toggle("hidden");
    $menu.classList.toggle("flex");
    $body.classList.toggle("overflow:-hidden");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767.99) {
      $menu.classList.add("hidden");
      $menu.classList.remove("flex");
      $burger.classList.remove("active");
      $body.classList.remove("overflow:-hidden");
    }
  });
}
toggleMenu();

function toggleTabs(tabsTriggerClass, tabsContentClass) {
  const tabs_triggers = document.querySelectorAll(tabsTriggerClass);
  const tabs_contents = document.querySelectorAll(tabsContentClass);
  tabs_contents.forEach((content) => {
    content.classList.add("hidden");
  });
  tabs_contents[0].classList.remove("hidden");
  tabs_triggers.forEach((trigger, idx) => {
    trigger.addEventListener("click", () => {
      tabs_triggers.forEach((t) => t.classList.remove("active"));
      trigger.classList.add("active");
      tabs_contents.forEach((content) => {
        content.classList.add("hidden");
      });
      tabs_contents[idx].classList.remove("hidden");
    });
  });
}
toggleTabs(".tab-trigger", ".tab-content");

function formatDate(date) {
  return (
    (date.getDate() < 10 ? "0" : "") +
    date.getDate() +
    "-" +
    (date.getMonth() + 1 < 10 ? "0" : "") +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
}

function updateDateForElement(elementId) {
  var dateSpan = document.getElementById(elementId);
  var currentDate = new Date();
  dateSpan.textContent = formatDate(currentDate);
}
updateDateForElement("dateSpan");
updateDateForElement("dateSpan_2");
updateDateForElement("dateSpan_3");
setInterval(function () {
  updateDateForElement("dateSpan");
  updateDateForElement("dateSpan_2");
  updateDateForElement("dateSpan_3");
}, 1000);

function accordion() {
  const items = document.querySelectorAll(".accordion-triger");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode;
      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
      } else {
        //First we delete the activity class, the one we click on
        document
          .querySelectorAll(".accordion-item")
          .forEach((child) => child.classList.remove("active"));
        //Open
        parent.classList.add("active");
      }
    });
  });
}
accordion();
const form = document.getElementById("emailForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkEmail();
});

function checkEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValue = emailInput.value.trim();
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailValue === "") {
    emailInput.value = "";
    emailInput.placeholder = "Opps, come again";
    setTimeout(function () {
      emailInput.placeholder = "Enter your email";
    }, 1000);
  } else if (re.test(emailValue)) {
    const emailObject = {
      date: new Date().toLocaleString(),
      email: emailValue,
    };
    let existingEmails = JSON.parse(localStorage.getItem("validEmails")) || [];
    // We check if such an email is already in the array
    if (existingEmails.some((item) => item.email === emailValue)) {
      emailInput.value = "";
      emailInput.placeholder = "Emeil was already";
      setTimeout(function () {
        emailInput.placeholder = "Enter your email";
      }, 1000);
    } else {
      existingEmails.unshift(emailObject);
      localStorage.setItem("validEmails", JSON.stringify(existingEmails));
      emailError.textContent = "";
      emailInput.value = "";
      emailInput.placeholder = "Enter your email";
      showSuccess(emailInput);
    }
  } else {
    emailInput.value = "";
    emailInput.placeholder = "Email is not correct";
    setTimeout(function () {
      emailInput.placeholder = "Enter your email";
    }, 2000);
  }
}

function showSuccess(input) {
  const currentPlaceholder = input.placeholder;
  input.placeholder = "Success!";
  input.value = "";
  setTimeout(function () {
    input.placeholder = currentPlaceholder;
  }, 2000);
}
