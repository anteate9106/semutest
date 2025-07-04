// 전역 변수
let currentQuestion = 1;
let totalQuestions = 20;
let examTimer = null;
let timeLeft = 1800; // 30분
let userAnswers = {};
let currentCategory = '';

// 시험 문제 데이터
const examQuestions = {
    'tax-law': [
        {
            question: "다음 중 소득세법상 종합소득세 과세표준의 계산에 관한 설명으로 옳은 것은?",
            options: [
                "종합소득공제는 과세표준 계산 시 공제된다.",
                "기본공제는 과세표준 계산 후 공제된다.",
                "특별공제는 과세표준 계산 전에 공제된다.",
                "표준공제는 과세표준 계산 시 공제되지 않는다."
            ],
            correct: 0
        },
        {
            question: "법인세법상 감가상각비의 계산에 관한 설명으로 옳지 않은 것은?",
            options: [
                "정액법은 매년 동일한 금액을 상각한다.",
                "정률법은 매년 감소하는 금액을 상각한다.",
                "상각한도액은 자산의 취득가액을 초과할 수 없다.",
                "감가상각비는 손금산입이 가능하다."
            ],
            correct: 2
        },
        {
            question: "부가가치세법상 영세율 적용 대상이 아닌 것은?",
            options: [
                "수출하는 재화",
                "외국인 관광객에 대한 재화의 공급",
                "면세재화의 수출",
                "국내에서 소비되는 재화"
            ],
            correct: 3
        }
    ],
    'accounting': [
        {
            question: "재무회계에서 자산의 정의에 해당하지 않는 것은?",
            options: [
                "과거의 거래나 사건의 결과로 발생한 자원",
                "미래에 경제적 효익을 창출할 것으로 기대되는 자원",
                "기업이 통제하고 있는 자원",
                "미래에 지급의무가 있는 부채"
            ],
            correct: 3
        },
        {
            question: "원가회계에서 직접재료비에 해당하는 것은?",
            options: [
                "공장장의 급여",
                "제품에 직접 사용되는 원재료",
                "공장의 전기료",
                "공장의 임대료"
            ],
            correct: 1
        }
    ],
    'business-law': [
        {
            question: "상법상 주식회사의 이사회 구성에 관한 설명으로 옳은 것은?",
            options: [
                "이사는 1명 이상이면 된다.",
                "감사는 반드시 2명 이상이어야 한다.",
                "대표이사는 반드시 1명이어야 한다.",
                "이사회는 주주총회의 결의로 구성된다."
            ],
            correct: 0
        }
    ],
    'practice': [
        {
            question: "세무실무에서 종합소득세 신고서 작성 시 포함되지 않는 소득은?",
            options: [
                "이자소득",
                "배당소득",
                "사업소득",
                "퇴직소득"
            ],
            correct: 3
        }
    ]
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    setupNavigation();
    setupModals();
    setupMobileMenu();
    setupSmoothScrolling();
}

// 네비게이션 설정
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'login') {
                showModal('login');
            } else {
                scrollToSection(targetId);
            }
        });
    });
}

// 모달 설정
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // 모달 닫기 버튼 이벤트
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // 모달 외부 클릭 시 닫기
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this);
            }
        });
    });
    
    // 로그인 폼 제출
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// 모바일 메뉴 설정
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// 섹션으로 스크롤
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 모달 표시
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 모달 숨기기
function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 로그인 처리
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        // 실제 구현에서는 서버로 로그인 요청을 보냄
        alert('로그인 성공!');
        hideModal(document.getElementById('login'));
        
        // 로그인 버튼을 사용자 이름으로 변경
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = username;
        loginBtn.onclick = null;
    } else {
        alert('아이디와 비밀번호를 입력해주세요.');
    }
}

// 회원가입 모달 표시
function showSignup() {
    alert('회원가입 기능은 준비 중입니다.');
}

// 시험 시작
function startExam() {
    showModal('exam-modal');
    loadQuestion(1);
    startTimer();
}

// 성적 확인
function viewResults() {
    scrollToSection('results');
}

// 카테고리 선택
function selectCategory(category) {
    currentCategory = category;
    const categoryNames = {
        'tax-law': '세법',
        'accounting': '회계',
        'business-law': '상법',
        'practice': '실무'
    };
    
    document.getElementById('exam-title').textContent = categoryNames[category] + ' 시험';
    showModal('exam-modal');
    loadQuestion(1);
    startTimer();
}

// 문제 로드
function loadQuestion(questionNumber) {
    if (!currentCategory || !examQuestions[currentCategory]) {
        alert('카테고리를 선택해주세요.');
        return;
    }
    
    const questions = examQuestions[currentCategory];
    if (questionNumber < 1 || questionNumber > questions.length) {
        return;
    }
    
    currentQuestion = questionNumber;
    const question = questions[questionNumber - 1];
    
    // 문제 번호 업데이트
    document.querySelector('.question-number').textContent = `문제 ${questionNumber} / ${questions.length}`;
    
    // 문제 텍스트 업데이트
    document.getElementById('question-text').textContent = question.question;
    
    // 선택지 업데이트
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `q${questionNumber}`;
        radio.value = index;
        
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = `${index + 1}. ${option}`;
        
        label.appendChild(radio);
        label.appendChild(optionText);
        optionsContainer.appendChild(label);
        
        // 이전 답변 복원
        if (userAnswers[`q${questionNumber}`] === index) {
            radio.checked = true;
        }
    });
    
    // 답변 저장
    const radioButtons = document.querySelectorAll(`input[name="q${questionNumber}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            userAnswers[`q${questionNumber}`] = parseInt(this.value);
        });
    });
    
    // 네비게이션 버튼 업데이트
    updateNavigationButtons(questions.length);
}

// 네비게이션 버튼 업데이트
function updateNavigationButtons(totalQuestions) {
    const navContainer = document.querySelector('.question-nav');
    navContainer.innerHTML = '';
    
    for (let i = 1; i <= totalQuestions; i++) {
        const button = document.createElement('button');
        button.className = 'nav-btn';
        button.textContent = i;
        button.onclick = () => goToQuestion(i);
        
        // 답변 완료 여부에 따른 스타일
        if (userAnswers[`q${i}`] !== undefined) {
            button.style.backgroundColor = '#667eea';
            button.style.color = 'white';
        }
        
        navContainer.appendChild(button);
    }
}

// 이전 문제
function prevQuestion() {
    if (currentQuestion > 1) {
        loadQuestion(currentQuestion - 1);
    }
}

// 다음 문제
function nextQuestion() {
    const questions = examQuestions[currentCategory];
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion + 1);
    } else {
        // 마지막 문제인 경우 시험 제출
        submitExam();
    }
}

// 특정 문제로 이동
function goToQuestion(questionNumber) {
    loadQuestion(questionNumber);
}

// 타이머 시작
function startTimer() {
    timeLeft = 1800; // 30분
    updateTimerDisplay();
    
    examTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(examTimer);
            alert('시험 시간이 종료되었습니다.');
            submitExam();
        }
    }, 1000);
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('timer');
    
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // 시간이 부족할 때 경고 색상
        if (timeLeft <= 300) { // 5분 이하
            timerElement.style.color = '#ff4444';
        }
    }
}

// 시험 제출
function submitExam() {
    clearInterval(examTimer);
    
    const questions = examQuestions[currentCategory];
    let correctAnswers = 0;
    let totalAnswered = 0;
    
    // 정답 확인
    questions.forEach((question, index) => {
        const questionNumber = index + 1;
        const userAnswer = userAnswers[`q${questionNumber}`];
        
        if (userAnswer !== undefined) {
            totalAnswered++;
            if (userAnswer === question.correct) {
                correctAnswers++;
            }
        }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // 결과 표시
    const resultMessage = `
        시험 결과
        
        총 문제 수: ${questions.length}문제
        답변한 문제: ${totalAnswered}문제
        정답 수: ${correctAnswers}문제
        점수: ${score}점
        
        ${score >= 80 ? '🎉 합격입니다!' : '😔 불합격입니다. 더 열심히 공부하세요!'}
    `;
    
    alert(resultMessage);
    
    // 모달 닫기
    hideModal(document.getElementById('exam-modal'));
    
    // 답변 초기화
    userAnswers = {};
    currentQuestion = 1;
}

// 페이지 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// 애니메이션 효과
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .summary-card, .results-detail');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 페이지 로드 시 애니메이션 시작
window.addEventListener('load', animateOnScroll);
