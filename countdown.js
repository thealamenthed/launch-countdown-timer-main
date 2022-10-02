const minutes = 60;
const hours = 60 * minutes;
const days = 24 * hours;
const elements = {
  days: document.getElementById("days"), //clé days qui va contenir l'element jour
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  secondes: document.getElementById("secondes"),
};

let previewDiff = {};
const countdown = document.querySelector("#countdown");
const launchDate = Date.parse(countdown.dataset.time) / 1000; // pour récuperer les diférentes propriétés de la valeur de time divisé par 1000 pour les secondes

// Calculer la différence en seconde entre les 2 dates
function refreshcCountdown() {
  const difference = launchDate - Date.now() / 1000;
  if (difference <= 0) {
    document.location.reload();
    return;
  }
  /* console.log(countdown) */

  // On crée un objet qui contient les heures, minutes, secondes
  const diff = {
    days: Math.floor(difference / days), //fonction qui calcule le nombre de jour
    hours: Math.floor((difference % days) / hours),
    minutes: Math.floor((difference % hours) / minutes),
    secondes: Math.floor(difference % minutes),
  };
  updateDom(diff);

  window.setTimeout(() => {
    window.requestAnimationFrame(refreshcCountdown);
  }, 1000);
}

/**
 * Met à jour la structure HTML en fonction d'un nouvel interval
 * @param {{days: number, hours: number, minutes: number, secondes: number}} diff
 */
// On va envoyer cet objet à une fonction qui mettre à jour l'HTML
function updateDom(diff) {
  Object.keys(diff).forEach((key) => {
    if (previewDiff[key] !== diff[key]) {
      elements[key].innerText = diff[key];
    }
  });
  previousDiff = diff;
}

refreshcCountdown();
/* console.log(diff); */
