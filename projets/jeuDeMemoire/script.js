// Emojis d'animaux pour les cartes
const animals = ['🐶', '🐱', '🐼', '🦊', '🐨', '🐸', '🦁', '🐯'];

// Variables du jeu
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

// Sons
const flipSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKzn77ZgGwU7k9r0yXUqBSl+zPLaizsKElyx6+uoVRMKRp/h8r9vIAUsgs/y2Ik2CBlpu+/inE0MDFCr5++0YRsFN5DZ9Ml2KwUpfszx2oo5ChJasOvqqVUSCkaY4fO+cB8GLIHu8tiKNwgZaLzw4puNDAxPquXvsGIbBTmR2vLJdSoFKX/M8tqJOQoRWa7q66lUEgpFlN/zv3AfBiuAzvLZiTYIF2i78OKajQwMT6rl77FhGgU5kdny');

// Initialisation du jeu
function initGame() {
    // Créer un tableau avec les paires d'animaux
    cards = [...animals, ...animals];
    
    // Mélanger les cartes
    cards = shuffleArray(cards);
    
    // Réinitialiser les variables
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    // Mettre à jour l'affichage
    document.querySelector('.moves').textContent = moves;
    
    // Générer le plateau de jeu
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards.forEach((animal, index) => {
        const card = createCard(animal, index);
        gameBoard.appendChild(card);
    });
    
    // Cacher le modal de victoire
    document.getElementById('victoryModal').classList.remove('show');
}

// Créer une carte
function createCard(animal, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.animal = animal;
    
    card.innerHTML = `
        <div class="card-front">${animal}</div>
        <div class="card-back"></div>
    `;
    
    card.addEventListener('click', () => flipCard(card));
    
    return card;
}

// Retourner une carte
function flipCard(card) {
    // Vérifier si on peut retourner la carte
    if (!canFlip || 
        card.classList.contains('flipped') || 
        card.classList.contains('matched') ||
        flippedCards.length >= 2) {
        return;
    }
    
    // Jouer le son
    playFlipSound();
    
    // Retourner la carte
    card.classList.add('flipped');
    flippedCards.push(card);
    
    // Vérifier s'il y a deux cartes retournées
    if (flippedCards.length === 2) {
        moves++;
        document.querySelector('.moves').textContent = moves;
        canFlip = false;
        
        setTimeout(checkMatch, 800);
    }
}

// Vérifier si les cartes correspondent
function checkMatch() {
    const [card1, card2] = flippedCards;
    const animal1 = card1.dataset.animal;
    const animal2 = card2.dataset.animal;
    
    if (animal1 === animal2) {
        // Les cartes correspondent
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        // Vérifier si toutes les paires sont trouvées
        if (matchedPairs === animals.length) {
            setTimeout(showVictory, 500);
        }
    } else {
        // Les cartes ne correspondent pas
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }
    
    flippedCards = [];
    canFlip = true;
}

// Afficher le message de victoire
function showVictory() {
    const modal = document.getElementById('victoryModal');
    document.getElementById('finalMoves').textContent = moves;
    modal.classList.add('show');
}

// Recommencer le jeu
function restartGame() {
    initGame();
}

// Mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Jouer le son de retournement
function playFlipSound() {
    // Créer un son simple avec l'API Web Audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Lancer le jeu au chargement de la page
window.addEventListener('DOMContentLoaded', initGame);