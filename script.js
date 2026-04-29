const models = [
    { 
        src: '100.glb', 
        name: 'Kodak Instamatic 100',
        frontOrbit: '90deg 90deg auto',
        backOrbit: '270deg 90deg auto',
        polaroidImage: 'p1.jpg',
        polaroidCaption: '1963',
        info: '• Uses 126 cartridge film<br>• Fixed focus lens<br>• No manual controls<br>• Viewfinder-based framing<br>• Lightweight plastic body'
    },
    { 
        src: '56x.glb', 
        name: 'Kodak Instamatic 56x',
        frontOrbit: '90deg 90deg auto',
        backOrbit: '270deg 90deg auto',
        polaroidImage: 'p2.jpg',
        polaroidCaption: '1970',
        info: '• Uses 126 cartridge film<br>• Basic exposure settings<br>• Supports rotating Flashcube<br>• Good for indoor/low-light<br>• Simple shutter mechanism'
    },
    { 
        src: 'hotshot.glb', 
        name: 'Hotshot 110s',
        frontOrbit: '90deg 90deg auto', 
        backOrbit: '180deg 90deg auto',
        polaroidImage: 'p3.jpg',
        polaroidCaption: '1970 - 1980',
        info: '• Uses 110 cartridge film<br>• Fixed focus, lightweight<br>• Built-in flash<br>• Pocket-sized & portable<br>• Ideal for quick snapshots'
    }
];

let currentIndex = 0;

const landingPage = document.getElementById('landing-page');
const museumPage = document.getElementById('museum-page');
const enterMuseumBtn = document.getElementById('enter-museum-btn');
const backToLandingBtn = document.getElementById('back-to-landing');

const modelViewer = document.getElementById('museum-model');
const modelWrapper = document.getElementById('model-wrapper');
const polaroidContainer = document.getElementById('polaroid-container');
const polaroidInner = document.getElementById('polaroid-inner');
const modelInfo = document.getElementById('model-info');
const photoArea = document.querySelector('.photo-area');
const polaroidCaptionText = document.getElementById('polaroid-caption-text');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const insertFilmBtn = document.getElementById('insert-film-btn');
const shutterBtn = document.getElementById('shutter-btn');
const infoBtn = document.getElementById('info-btn');
const shutterSound = document.getElementById('shutter-sound');
const headerTitle = document.querySelector('.museum-header h1');
const headerSubtitle = document.querySelector('.museum-header p');

function loadModel(index) {
    const model = models[index];
    modelViewer.src = model.src;
    modelInfo.innerHTML = model.info;
    
    if (headerTitle) {
        headerTitle.textContent = model.name;
    }

    if (photoArea) {
        photoArea.style.backgroundImage = `url(${model.polaroidImage})`;
    }

    if (polaroidCaptionText) {
        polaroidCaptionText.textContent = model.polaroidCaption;
    }

    resetView();
}

function resetView() {
    modelViewer.setAttribute('camera-orbit', models[currentIndex].frontOrbit);
    modelViewer.cameraOrbit = models[currentIndex].frontOrbit; 
    modelViewer.cameraControls = true;
    
    modelWrapper.classList.remove('move-left');
    polaroidContainer.classList.remove('step-emerge', 'step-slide');
    polaroidInner.classList.remove('flipped');
    
    insertFilmBtn.style.display = 'block';
    shutterBtn.style.display = 'none';
    infoBtn.style.display = 'none';
    infoBtn.textContent = 'Information';
}

prevBtn.addEventListener('click', function() {
    if (currentIndex === 0) {
        currentIndex = models.length - 1;
    } else {
        currentIndex = currentIndex - 1;
    }
    loadModel(currentIndex);
});

nextBtn.addEventListener('click', function() {
    if (currentIndex === models.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex = currentIndex + 1;
    }
    loadModel(currentIndex);
});

insertFilmBtn.addEventListener('click', function() {
    modelViewer.setAttribute('camera-orbit', models[currentIndex].backOrbit);
    modelViewer.cameraOrbit = models[currentIndex].backOrbit;
    modelViewer.cameraControls = false;

    insertFilmBtn.style.display = 'none';
    shutterBtn.style.display = 'block';
});

shutterBtn.addEventListener('click', function() {
    shutterSound.currentTime = 0;
    shutterSound.play();

    modelViewer.setAttribute('camera-orbit', models[currentIndex].frontOrbit);
    modelViewer.cameraOrbit = models[currentIndex].frontOrbit;
    modelViewer.cameraControls = false;

    polaroidContainer.classList.remove('step-slide');
    polaroidInner.classList.remove('flipped');
    
    polaroidContainer.classList.add('step-emerge');

    shutterBtn.style.display = 'none';

    setTimeout(function() {
        polaroidContainer.classList.add('step-slide');
        modelWrapper.classList.add('move-left');
        infoBtn.style.display = 'block';
    }, 1500);
});

infoBtn.addEventListener('click', function() {
    let isFlipped = polaroidInner.classList.toggle('flipped');
    
    if (isFlipped) {
        infoBtn.textContent = 'View Photo';
    } else {
        infoBtn.textContent = 'Information';
    }
});

enterMuseumBtn.addEventListener('click', function() {
    landingPage.style.display = 'none';
    museumPage.style.display = 'flex';
});

backToLandingBtn.addEventListener('click', function(e) {
    e.preventDefault();
    museumPage.style.display = 'none';
    landingPage.style.display = 'flex';
});

loadModel(currentIndex);