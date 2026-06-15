// ==========================================
// 1. 設定・テスト用データ
// ==========================================
const MASTER_PASSWORD = "open123"; // アプリを開くためのマスターキーワード

// 保存されているパスワードデータ
const passwordData = [
    { id: 1, label: "Google アカウント", password: "G-Pass**87" },
    { id: 2, label: "Amazon.co.jp", password: "Amz-Secret99" },
    { id: 3, label: "お気に入りサイト", password: "MyKey🔑777" }
];

// ==========================================
// 2. 画面の要素（HTML）を取得
// ==========================================
const lockScreen = document.getElementById('lock-screen');
const mainScreen = document.getElementById('main-screen');
const passwordInput = document.getElementById('master-password-input');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const keycaseContainer = document.getElementById('keycase-container');

// ==========================================
// 3. 起動時ロック解除の処理
// ==========================================
loginBtn.addEventListener('click', checkMasterPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkMasterPassword();
});

function checkMasterPassword() {
    const inputVal = passwordInput.value;
    
    if (inputVal === MASTER_PASSWORD) {
        lockScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        renderKeycases();
    } else {
        errorMessage.textContent = "キーワードが正しくありません。";
        passwordInput.value = "";
    }
}

// ==========================================
// 4. キーケース一覧の生成と開閉処理
// ==========================================
function renderKeycases() {
    keycaseContainer.innerHTML = ""; // 初期化

    passwordData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'keycase-card';

        // CSSの装飾クラス（metal-hook, leather-loop, keys-containerなど）をすべて反映
        card.innerHTML = `
            <div class="keycase-label">${item.label}</div>
            <div class="keycase-wrapper">
                <div class="keycase-front">
                    <div class="metal-hook"></div>
                    <div class="leather-loop"></div>
                    <img src="images/closed.png" alt="🔒" class="keycase-img" onerror="this.style.display='none';">
                </div>
                <div class="keycase-back">
                    <div class="metal-plate"></div>
                    <div class="keys-container">
                        <div class="css-key">
                            <div class="css-key-head"></div>
                            <div class="css-key-shaft"></div>
                        </div>
                    </div>
                    <img src="images/open.png" alt="🔓" class="keycase-img" onerror="this.style.display='none';">
                    <div class="password-display">${item.password}</div>
                </div>
            </div>
        `;

        // クリックで開閉
        card.addEventListener('click', () => {
            card.classList.toggle('is-open');
        });

        keycaseContainer.appendChild(card);
    });
}