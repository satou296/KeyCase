// ==========================================
// 1. 設定・テスト用データ
// ==========================================
// アプリを開くためのマスターキーワード
const MASTER_PASSWORD = "open123"; 

// 保存されているパスワードデータ（本来は暗号化して保存します）
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
        // ロック画面を隠し、メイン画面を表示
        lockScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        // キーケース一覧を画面に生成
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
        // カード全体の要素を作成
        const card = document.createElement('div');
        card.className = 'keycase-card';

        card.innerHTML = `
            <div class="keycase-label">${item.label}</div>
            <div class="keycase-wrapper">
                <div class="keycase-front">
                    <img src="images/closed.png" alt="🔒 閉じたキーケース" class="keycase-img" onerror="this.style.display='none';">
                    <span style="color:white; font-size:40px; position:absolute;">🔑</span>
                </div>
                <div class="keycase-back">
                    <img src="images/open.png" alt="🔓 開いたキーケース" class="keycase-img" onerror="this.style.display='none';">
                    <div class="password-display" style="position:absolute;">${item.password}</div>
                </div>
            </div>
        `;

        // クリックしたときに「is-open」クラスをつけ外しする（開閉アニメーションのトリガー）
        card.addEventListener('click', () => {
            card.classList.toggle('is-open');
        });

        keycaseContainer.appendChild(card);
    });
}