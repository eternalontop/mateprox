const mateproScreen = document.getElementById('matepro-screen');
const homeScreen = document.getElementById('home-screen');
const appContent = document.getElementById('app-content');
const mateproAppIcon = document.getElementById('matepro-app');

let historyStack = [];

// Base de datos de problemas en formato JSON
const PROBLEMS = [
    {
        id: 1,
        question: "¿Cuánto es $5 \\times 8$?",
        answer: "40",
        details: "Este es un problema básico de multiplicación. La práctica te ayudará a ser más rápido con estos cálculos."
    },
    {
        id: 2,
        question: "Si un panadero hace 12 pasteles por hora y trabaja 4 horas, ¿cuántos pasteles hizo en total?",
        answer: "48",
        details: "Este es un problema de lógica y multiplicación. Simplemente multiplica la cantidad de pasteles por hora por el número de horas trabajadas."
    },
    {
        id: 3,
        question: "¿Cuál es el área de un cuadrado con un lado de 7 cm?",
        answer: "49",
        details: "Recuerda que el área de un cuadrado se calcula elevando al cuadrado la longitud de uno de sus lados, es decir, lado $\\times$ lado."
    },
    {
        id: 4,
        question: "Una tienda ofrece un 20% de descuento en una camisa de 50. ¿Cuál es el precio final?",
        answer: "40",
        details: "Primero, calcula el 20% de 50, que es $50 \\times 0.20$. Luego, resta esa cantidad del precio original."
    },
    {
        id: 5,
        question: "¿Cuál es la raíz cuadrada de 144?",
        answer: "12",
        details: "La raíz cuadrada de un número es el valor que, cuando se multiplica por sí mismo, da el número original. En este caso, $12 \\times 12 = 144$."
    }
];

// Base de datos de lecciones en formato JSON con URL de video directo
const LESSONS = [
    {
        id: 1,
        title: "Lección 1: ¿Qué son los números primos?",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        details: "En esta lección, aprenderás a identificar los números primos y por qué son tan importantes en matemáticas. ¡Prepárate para un viaje al mundo de los bloques de construcción de los números!"
    },
    {
        id: 2,
        title: "Lección 2: Entendiendo las fracciones",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        details: "Las fracciones son una forma de representar partes de un todo. Descubre cómo se suman, restan, multiplican y dividen de una manera muy sencilla."
    },
    {
        id: 3,
        title: "Lección 3: Introducción al Álgebra",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        details: "El álgebra te ayuda a resolver problemas usando letras en lugar de números. Es como un rompecabezas. En esta lección, aprenderás los conceptos básicos del álgebra."
    }
];

// Base de datos de quizzes en formato JSON con feedback
const QUIZZES = [
    {
        id: 1,
        question: "¿Qué es un número primo?",
        options: [
            { text: "Un número que solo tiene dos divisores: 1 y él mismo.", isCorrect: true, feedback: "¡Correcto! Los números primos son los ladrillos de la matemática." },
            { text: "Un número que es divisible por 2.", isCorrect: false, feedback: "Incorrecto. Los números divisibles por 2 se llaman números pares." },
            { text: "Un número que es divisible por cualquier otro número.", isCorrect: false, feedback: "Incorrecto. Eso es imposible para la mayoría de los números." },
            { text: "Un número que se puede escribir como una fracción.", isCorrect: false, feedback: "Incorrecto. Un número que se puede escribir como una fracción es un número racional." }
        ]
    },
    {
        id: 2,
        question: "¿Cuál de las siguientes fracciones es equivalente a 1/2?",
        options: [
            { text: "2/3", isCorrect: false, feedback: "Incorrecto. $2/3$ es mayor que $1/2$." },
            { text: "3/6", isCorrect: true, feedback: "¡Correcto! Si simplificas $3/6$, obtienes $1/2$." },
            { text: "1/4", isCorrect: false, feedback: "Incorrecto. $1/4$ es la mitad de $1/2$." },
            { text: "2/5", isCorrect: false, feedback: "Incorrecto. $2/5$ es igual a $0.4$, no a $0.5$." }
        ]
    },
    {
        id: 3,
        question: "Si $x + 5 = 12$, ¿cuál es el valor de $x$?",
        options: [
            { text: "5", isCorrect: false, feedback: "Incorrecto. Si $x$ fuera $5$, la ecuación sería $5 + 5 = 10$, no $12$." },
            { text: "7", isCorrect: true, feedback: "¡Correcto! Si restas $5$ de $12$, obtienes $7$." },
            { text: "17", isCorrect: false, feedback: "Incorrecto. Si sumas $12 + 5$, obtienes $17$." },
            { text: "6", isCorrect: false, feedback: "Incorrecto. $6 + 5 = 11$." }
        ]
    },
    {
        id: 4,
        question: "En una secuencia, el primer número es $3$ y cada número siguiente es el doble del anterior. ¿Cuál es el cuarto número?",
        options: [
            { text: "6", isCorrect: false, feedback: "Incorrecto. $6$ es el segundo número." },
            { text: "12", isCorrect: false, feedback: "Incorrecto. $12$ es el tercer número." },
            { text: "24", isCorrect: true, feedback: "¡Correcto! La secuencia es: $3, 6, 12, 24$." },
            { text: "30", isCorrect: false, feedback: "Incorrecto. Sigue la regla de duplicar el número anterior." }
        ]
    },
    {
        id: 5,
        question: "¿Cuál es la fórmula para el área de un círculo?",
        options: [
            { text: "$A = 2 \\pi r$", isCorrect: false, feedback: "Incorrecto. Esa es la fórmula para la circunferencia." },
            { text: "$A = \\pi d$", isCorrect: false, feedback: "Incorrecto. Eso es una variación de la circunferencia." },
            { text: "$A = \\pi r^2$", isCorrect: true, feedback: "¡Correcto! Recuerda que el radio ($r$) se eleva al cuadrado." },
            { text: "$A = r^2$", isCorrect: false, feedback: "Incorrecto. No incluye $\\pi$." }
        ]
    }
];

function renderHomePage() {
    appContent.innerHTML = `
        <div class="app-home-content">
            <div class="logo-name-container">
                <img src="https://i.pinimg.com/736x/ec/a1/4e/eca14e8345018e071645b9524356319c.jpg" alt="MatePro Logo" class="app-logo" />
                <h1 class="text-5xl font-extrabold text-white mb-8 drop-shadow-lg animate-pulse">MatePro</h1>
            </div>
            <a href="#" class="app-button" id="info-btn">
                <i class="fas fa-info-circle"></i>
                Información
            </a>
            <a href="#" class="app-button" id="learn-btn">
                <i class="fas fa-play-circle"></i>
                Empezar a aprender
            </a>
        </div>
    `;
    addListeners();
}

function renderInfoPage() {
    appContent.innerHTML = `
        <div class="info-page p-6 rounded-3xl">
            <h2 class="text-2xl font-bold text-center mb-4 gradient-text">Acerca de MatePro</h2>
            <img src="https://placehold.co/600x400/007bff/ffffff?text=Evolución+del+Aprendizaje" alt="Evolución del Aprendizaje" class="info-image">
            <p class="mb-4">
                MatePro es más que una simple aplicación educativa; es una herramienta diseñada con la misión de democratizar el aprendizaje de las matemáticas. Nuestra meta es transformar la percepción común de que las matemáticas son un tema árido y difícil. Buscamos mostrar su belleza inherente y su relevancia en el mundo real, despertando la curiosidad y la pasión en estudiantes de todas las edades.
            </p>
            <h3 class="text-xl font-bold mt-6 mb-2 gradient-text">Nuestra Metodología</h3>
            <p class="mb-4">
                Utilizamos una metodología de aprendizaje gamificada, donde cada concepto se presenta como un desafío a superar. A través de lecciones interactivas, problemas lúdicos y quizzes, los usuarios no solo memorizan fórmulas, sino que realmente comprenden los principios que las rigen. Creemos que el error es una parte crucial del aprendizaje, por lo que cada equivocación es una oportunidad para crecer.
            </p>
            <img src="https://placehold.co/600x400/ffa500/ffffff?text=Aprendizaje+Divertido" alt="Aprendizaje Divertido" class="info-image">
            <h3 class="text-xl font-bold mt-6 mb-2 gradient-text">Visión de Futuro</h3>
            <p class="mb-4">
                Soñamos con un mundo donde el miedo a los números sea cosa del pasado. MatePro se compromete a expandir sus fronteras, incluyendo temas más avanzados, integración con la inteligencia artificial para un aprendizaje personalizado y la creación de una comunidad global de "MatePro-ers" que se apoyen mutuamente en su viaje educativo. Juntos, haremos que las matemáticas sean accesibles y divertidas para todos.
            </p>
            
            <div class="mt-8 pt-4 border-t border-blue-200">
                <h3 class="text-xl font-bold text-center mb-2 gradient-text">Créditos</h3>
                <p class="text-center text-sm">Diseño y desarrollo por el equipo de **Innovación Educativa**.
                <br>Íconos de <a href="https://fontawesome.com/" target="_blank" class="text-blue-500 font-bold hover:underline">Font Awesome</a>.</p>
            </div>
        </div>
    `;
    addListeners();
}

function renderCategoryPage() {
    const tips = [
        "¡Practica todos los días para ser un genio de las matemáticas!",
        "No temas equivocarte; cada error es un paso hacia el éxito.",
        "Divide los problemas grandes en pequeñas partes. ¡Es más fácil!",
        "Usa dibujos y diagramas para visualizar los problemas.",
        "¡Enséñale a un amigo lo que aprendiste! Es la mejor manera de memorizar."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    appContent.innerHTML = `
        <div class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-4 gradient-text">Categorías</h2>
            <ul class="list-none p-0 m-0">
                <li class="category-button" id="problems-btn" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
                    <i class="fas fa-pencil-alt text-xl"></i>
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Problemas</span>
                        <span class="text-sm font-light">Ejercicios para aplicar conceptos matemáticos.</span>
                    </div>
                </li>
                <li class="category-button" id="lessons-btn" style="background: linear-gradient(135deg, #007bff, #00c6ff);">
                    <i class="fas fa-book-open text-xl"></i>
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Lecciones</span>
                        <span class="text-sm font-light">Explicaciones detalladas y ejemplos claros.</span>
                    </div>
                </li>
                <li class="category-button" id="quizzes-btn" style="background: linear-gradient(135deg, #28a745, #20c997);">
                    <i class="fas fa-question-circle text-xl"></i>
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Quizzes</span>
                        <span class="text-sm font-light">Pruebas rápidas para evaluar tu conocimiento.</span>
                    </div>
                </li>
            </ul>
            <div class="bg-blue-50 bg-opacity-60 text-blue-800 rounded-2xl p-4 mt-6 text-center shadow-inner">
                <strong class="font-bold">Consejo del día:</strong> ${randomTip}
            </div>
        </div>
    `;
    addListeners();
}

function renderProblemSelectionPage() {
    let problemListHTML = PROBLEMS.map((problem, index) => {
        const isSolved = localStorage.getItem(`problem-${problem.id}-solved`) === 'true';
        const isLocked = index > 0 && localStorage.getItem(`problem-${problem.id - 1}-solved`) !== 'true';
        const statusClass = isSolved ? 'solved' : (isLocked ? 'locked' : '');
        const icon = isLocked ? '<i class="fas fa-lock"></i>' : `<i class="fas fa-star text-sm"></i>`;
        const action = isLocked ? '' : `onclick="renderProblemPage(${problem.id})"`;

        return `
            <li class="problem-button ${statusClass} cursor-pointer" ${action}>
                <div class="flex items-center justify-between w-full">
                    <span class="text-lg font-bold">Problema ${problem.id}</span>
                    ${icon}
                </div>
                <div class="text-sm font-light text-right w-full">${isSolved ? 'Completado' : (isLocked ? 'Bloqueado' : 'Disponible')}</div>
            </li>
        `;
    }).join('');

    appContent.innerHTML = `
        <div class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-4 gradient-text">Selecciona un Nivel</h2>
            <ul class="list-none p-0 m-0 problem-list">
                ${problemListHTML}
            </ul>
        </div>
    `;
    addListeners();
}

function renderProblemPage(id) {
    const problem = PROBLEMS.find(p => p.id === id);
    if (!problem) {
        return;
    }

    appContent.innerHTML = `
        <div class="problem-page p-6 rounded-3xl">
            <h2 class="text-3xl font-bold text-center mb-4 gradient-text">Problema ${problem.id}</h2>
            <div class="problem-card">
                <p class="text-xl font-semibold text-center mb-6">${problem.question}</p>
                <div class="flex flex-col items-center">
                    <input type="text" id="answer-input" placeholder="Tu respuesta" class="answer-input" />
                    <button id="check-answer-btn" class="check-btn mt-4">Comprobar</button>
                    <div id="feedback-message" class="mt-4 text-center text-lg font-bold"></div>
                </div>
            </div>
            <div class="mt-8 text-center text-sm font-light text-gray-600">
                <p>${problem.details}</p>
            </div>
        </div>
    `;

    document.getElementById('check-answer-btn').addEventListener('click', () => {
        const input = document.getElementById('answer-input').value;
        const feedback = document.getElementById('feedback-message');
        if (input.trim() === problem.answer) {
            feedback.innerHTML = '<span class="text-green-600 animate-pulse">¡Correcto!</span>';
            localStorage.setItem(`problem-${problem.id}-solved`, 'true');
            setTimeout(() => {
                historyStack.pop();
                renderProblemSelectionPage();
            }, 1000);
        } else {
            feedback.innerHTML = '<span class="text-red-600 animate-shake">¡Incorrecto! Intenta de nuevo.</span>';
        }
    });

    addListeners();
}

function renderLessonSelectionPage() {
    let lessonListHTML = LESSONS.map((lesson, index) => {
        const isWatched = localStorage.getItem(`lesson-${lesson.id}-watched`) === 'true';
        const isLocked = index > 0 && localStorage.getItem(`lesson-${lesson.id - 1}-watched`) !== 'true';
        const statusClass = isWatched ? 'watched' : (isLocked ? 'locked' : '');
        const icon = isLocked ? '<i class="fas fa-lock"></i>' : (isWatched ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-play-circle"></i>');
        const action = isLocked ? '' : `onclick="renderLessonPage(${lesson.id})"`;
        const actionText = isWatched ? 'Visto' : (isLocked ? 'Bloqueado' : 'Ver');

        return `
            <li class="lesson-button ${statusClass}" ${action}>
                <div class="flex items-center justify-between w-full">
                    <span class="text-lg font-bold">${lesson.title}</span>
                    ${icon}
                </div>
                <div class="text-sm font-light text-right w-full">${actionText}</div>
            </li>
        `;
    }).join('');

    appContent.innerHTML = `
        <div class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-4 gradient-text">Selecciona una Lección</h2>
            <ul class="list-none p-0 m-0 lesson-list">
                ${lessonListHTML}
            </ul>
        </div>
    `;
    addListeners();
}

function renderLessonPage(id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) {
        return;
    }

    appContent.innerHTML = `
        <div class="lesson-page p-6 rounded-3xl">
            <h2 class="text-3xl font-bold text-center mb-4 gradient-text">${lesson.title}</h2>
            <div class="video-container">
                <video id="lesson-video" controls width="100%">
                    <source src="${lesson.videoUrl}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
            <p class="text-sm text-center mt-4 mb-6">${lesson.details}</p>
            <button id="mark-as-watched-btn" class="check-btn w-full mt-4 opacity-50 cursor-not-allowed" disabled>Ya vi el video</button>
        </div>
    `;

    const videoElement = document.getElementById('lesson-video');
    const button = document.getElementById('mark-as-watched-btn');
    
    // El video se puede ver después de 15 segundos
    const requiredWatchTime = 15;
    
    // Maneja el progreso del video de forma precisa usando el evento 'timeupdate'
    const handleTimeUpdate = () => {
        if (videoElement.currentTime >= requiredWatchTime) {
            button.disabled = false;
            button.classList.remove('opacity-50', 'cursor-not-allowed');
            button.classList.add('animate-pulse-btn');
            // Elimina el evento para evitar que se ejecute innecesariamente
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    button.addEventListener('click', () => {
        localStorage.setItem(`lesson-${lesson.id}-watched`, 'true');
        // No usar alert(), se reemplaza por un mensaje en pantalla
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
        feedbackDiv.innerHTML = `
            <div class="bg-white p-6 rounded-lg text-center shadow-lg transform transition-transform duration-300 scale-100">
                <p class="text-xl font-bold">¡Lección completada!</p>
                <p class="mt-2 text-gray-600">Puedes seguir con la siguiente lección.</p>
            </div>
        `;
        document.body.appendChild(feedbackDiv);
        
        setTimeout(() => {
            feedbackDiv.remove();
            historyStack.pop();
            renderLessonSelectionPage();
        }, 1500);
    });

    addListeners();
}

function renderQuizSelectionPage() {
    let quizListHTML = QUIZZES.map((quiz, index) => {
        const isSolved = localStorage.getItem(`quiz-${quiz.id}-solved`) === 'true';
        const isLocked = index > 0 && localStorage.getItem(`quiz-${quiz.id - 1}-solved`) !== 'true';
        const statusClass = isSolved ? 'solved' : (isLocked ? 'locked' : '');
        const icon = isLocked ? '<i class="fas fa-lock"></i>' : `<i class="fas fa-star text-sm"></i>`;
        const action = isLocked ? '' : `onclick="renderQuizPage(${quiz.id})"`;

        return `
            <li class="quiz-button ${statusClass} cursor-pointer" ${action}>
                <div class="flex items-center justify-between w-full">
                    <span class="text-lg font-bold">Quiz ${quiz.id}</span>
                    ${icon}
                </div>
                <div class="text-sm font-light text-right w-full">${isSolved ? 'Completado' : (isLocked ? 'Bloqueado' : 'Disponible')}</div>
            </li>
        `;
    }).join('');

    appContent.innerHTML = `
        <div class="p-4 bg-white bg-opacity-90 rounded-3xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-4 gradient-text">Selecciona un Quiz</h2>
            <ul class="list-none p-0 m-0 quiz-list">
                ${quizListHTML}
            </ul>
        </div>
    `;
    addListeners();
}

function renderQuizPage(id) {
    const quiz = QUIZZES.find(q => q.id === id);
    if (!quiz) {
        return;
    }

    appContent.innerHTML = `
        <div class="quiz-page p-6 rounded-3xl">
            <h2 class="text-3xl font-bold text-center mb-4 gradient-text">Quiz ${quiz.id}</h2>
            <div class="quiz-card">
                <p class="text-xl font-semibold text-center mb-6">${quiz.question}</p>
                <div id="options-container" class="grid grid-cols-1 gap-4">
                    ${quiz.options.map((option, index) => `
                        <button class="option-btn bg-blue-100 text-blue-800 p-3 rounded-xl font-medium transition-all duration-300 hover:bg-blue-200" data-is-correct="${option.isCorrect}" data-feedback="${option.feedback}">
                            ${String.fromCharCode(65 + index)}. ${option.text}
                        </button>
                    `).join('')}
                </div>
                <div id="quiz-feedback" class="mt-4 text-center text-lg font-bold"></div>
            </div>
        </div>
    `;

    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const isCorrect = e.target.dataset.isCorrect === 'true';
            const feedback = e.target.dataset.feedback;
            const feedbackElement = document.getElementById('quiz-feedback');
            
            if (isCorrect) {
                feedbackElement.innerHTML = `<span class="text-green-600 animate-pulse">${feedback}</span>`;
                e.target.classList.add('bg-green-200', 'border-2', 'border-green-500');
                localStorage.setItem(`quiz-${quiz.id}-solved`, 'true');

                // Desactivar todos los botones para evitar más clics
                document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
                
                setTimeout(() => {
                    historyStack.pop();
                    renderQuizSelectionPage();
                }, 1500);

            } else {
                feedbackElement.innerHTML = `<span class="text-red-600 animate-shake">${feedback}</span>`;
                e.target.classList.add('bg-red-200', 'border-2', 'border-red-500');
                e.target.disabled = true;
            }
        });
    });

    addListeners();
}


function addListeners() {
    const infoBtn = document.getElementById('info-btn');
    if (infoBtn) {
        infoBtn.onclick = (e) => {
            e.preventDefault();
            historyStack.push(renderHomePage);
            renderInfoPage();
        };
    }

    const learnBtn = document.getElementById('learn-btn');
    if (learnBtn) {
        learnBtn.onclick = (e) => {
            e.preventDefault();
            historyStack.push(renderHomePage);
            renderCategoryPage();
        };
    }
    
    const problemsBtn = document.getElementById('problems-btn');
    if (problemsBtn) {
        problemsBtn.onclick = (e) => {
            e.preventDefault();
            historyStack.push(renderCategoryPage);
            renderProblemSelectionPage();
        };
    }

    const lessonsBtn = document.getElementById('lessons-btn');
    if (lessonsBtn) {
        lessonsBtn.onclick = (e) => {
            e.preventDefault();
            historyStack.push(renderCategoryPage);
            renderLessonSelectionPage();
        };
    }

    const quizzesBtn = document.getElementById('quizzes-btn');
    if (quizzesBtn) {
        quizzesBtn.onclick = (e) => {
            e.preventDefault();
            historyStack.push(renderCategoryPage);
            renderQuizSelectionPage();
        };
    }
}

// Listeners de navegación de la barra inferior
document.getElementById('nav-home').addEventListener('click', () => {
    homeScreen.style.display = 'grid';
    mateproScreen.style.display = 'none';
    historyStack = [];
});

document.getElementById('nav-info').addEventListener('click', () => {
    historyStack.push(renderHomePage);
    renderInfoPage();
});

document.getElementById('nav-back').addEventListener('click', () => {
    if (historyStack.length > 0) {
        const lastPage = historyStack.pop();
        lastPage();
    } else {
        homeScreen.style.display = 'grid';
        mateproScreen.style.display = 'none';
    }
});

mateproAppIcon.addEventListener('click', (e) => {
    e.preventDefault();
    homeScreen.style.display = 'none';
    mateproScreen.style.display = 'block';
    renderHomePage();
});

window.onload = () => {
    renderHomePage();
    mateproScreen.style.display = 'none';
}
