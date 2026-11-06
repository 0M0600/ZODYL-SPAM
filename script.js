/* ---------- Config ---------- */

const EMAILS = {

  "Mail 1": "yutakuroya@gmail.com",

  "Mail 2": "lulunina@gmail.com"

};



const categories = [

  {

    id: "love",

    name: "1. LOVE",

    icon: "💘",

    letters: [

      { title: "LOVE 1", text: "Mon amour {NUMERO}, chaque jour qui passe me rapproche un peu plus de toi. Tu es la plus belle chose qui me soit arrivée." },

      { title: "LOVE 2", text: "{NUMERO}, mon cœur bat pour toi depuis le premier jour. Je t'aime plus que les mots ne peuvent le dire." }

    ]

  },

  {

    id: "amour",

    name: "2. AMOUR",

    icon: "❤️",

    letters: [

      { title: "AMOUR 1", text: "{NUMERO}, tu es mon amour, ma raison de sourire chaque matin. Je pense à toi à chaque instant." },

      { title: "AMOUR 2", text: "Notre amour {NUMERO} est plus fort que tout. Je suis fier(e) de t'avoir dans ma vie." }

    ]

  },

  {

    id: "jetaime",

    name: "3. JE T'AIME",

    icon: "💍",

    letters: [

      { title: "JE T'AIME 1", text: "{NUMERO}, je t'aime. Simplement, sincèrement, chaque jour un peu plus." },

      { title: "JE T'AIME 2", text: "Je t'aime {NUMERO}, et je veux continuer à te le prouver chaque jour qui passe." }

    ]

  },

  {

    id: "ange",

    name: "4. MON ANGE",

    icon: "👼",

    letters: [

      { title: "MON ANGE 1", text: "Mon ange {NUMERO}, tu illumines ma vie comme personne d'autre ne l'a jamais fait." },

      { title: "MON ANGE 2", text: "{NUMERO}, tu es mon ange gardien, celle qui veille sur mon cœur." }

    ]

  },

  {

    id: "toietmoi",

    name: "5. TOI ET MOI",

    icon: "💞",

    letters: [

      { title: "TOI ET MOI 1", text: "Toi et moi {NUMERO}, pour toujours. Notre histoire ne fait que commencer." },

      { title: "TOI ET MOI 2", text: "{NUMERO}, rien ne pourra briser ce qu'il y a entre toi et moi." }

    ]

  }

];



let currentCategory = null;

let phoneValue = "{NUMERO}";



/* ---------- Intro ---------- */

document.getElementById('enterBtn').addEventListener('click', () => {

  const intro = document.getElementById('intro');

  intro.style.opacity = '0';

  setTimeout(() => {

    intro.style.display = 'none';

    document.getElementById('main').style.display = 'block';

  }, 1000);

});



/* ---------- Écran 1 : catégories ---------- */

function renderCategories() {

  const grid = document.getElementById('categoryGrid');

  grid.innerHTML = '';

  categories.forEach(cat => {

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `<div class="icon">${cat.icon}</div><h3>${cat.name.replace(/^\d+\.\s*/, '')}</h3><div class="count">${cat.letters.length} lettres d'amour</div>`;

    card.onclick = () => openCategory(cat.id);

    grid.appendChild(card);

  });

}



function updatePhone() {

  const val = document.getElementById('phoneNumber').value.trim();

  phoneValue = val ? val : "{NUMERO}";

  if (currentCategory) renderLetters(currentCategory);

}



/* ---------- Écran 2 : lettres ---------- */

function openCategory(id) {

  currentCategory = id;

  renderLetters(id);

  document.getElementById('main').style.display = 'none';

  document.getElementById('letters').style.display = 'block';

}



function goBack() {

  document.getElementById('letters').style.display = 'none';

  document.getElementById('main').style.display = 'block';

}



function renderLetters(id) {

  const cat = categories.find(c => c.id === id);

  document.getElementById('categoryTitle').innerText = cat.name;



  const grid = document.getElementById('letterGrid');

  grid.innerHTML = '';



  cat.letters.forEach((letter, i) => {

    const text = letter.text.replace(/{NUMERO}/g, phoneValue);

    const card = document.createElement('div');

    card.className = 'letter-card';

    card.innerHTML = `

      <h3>${letter.title}</h3>

      <textarea id="letter-${id}-${i}">${text}</textarea>

      <div class="mail-choice">

        ${Object.keys(EMAILS).map(label =>

          `<button class="btn-send" onclick="sendMail('${id}', ${i}, '${EMAILS[label]}')">📧 ${label}</button>`

        ).join('')}

      </div>

    `;

    grid.appendChild(card);

  });

}



function sendMail(catId, index, email) {

  const body = document.getElementById(`letter-${catId}-${index}`).value;

  const subject = encodeURIComponent("Pour toi mon amour 💌");

  const bodyEnc = encodeURIComponent(body);

  window.location.href = `mailto:${email}?subject=${subject}&body=${bodyEnc}`;

}



/* ---------- Pluie rouge style Matrix ---------- */

const canvas = document.getElementById('rain');

const ctx = canvas.getContext('2d');

const chars = "0123456789";



function resize() {

  canvas.width = innerWidth;

  canvas.height = innerHeight;

}

window.addEventListener('resize', resize);

resize();



const fontSize = 16;

let columns = Math.floor(canvas.width / fontSize);

let drops = Array(columns).fill(1);



function drawRain() {

  ctx.fillStyle = 'rgba(0,0,0,0.08)';

  ctx.fillRect(0, 0, canvas.width, canvas.height);



  ctx.fillStyle = '#ff0a0a';

  ctx.font = fontSize + 'px monospace';



  for (let i = 0; i < drops.length; i++) {

    const text = chars[Math.floor(Math.random() * chars.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);



    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {

      drops[i] = 0;

    }

    drops[i]++;

  }

}

setInterval(drawRain, 45);



/* ---------- Init ---------- */

renderCategories();


