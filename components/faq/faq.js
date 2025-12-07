document.addEventListener('DOMContentLoaded', function () {
    const questionButtons = Array.from(document.querySelectorAll('.faq__question'));
    const answers = Array.from(document.querySelectorAll('.faq__answer'));
    const questionsCol = document.querySelector('.faq__questions');
    const answersCol = document.querySelector('.faq__answers');

    if (!questionButtons.length || !answers.length || !questionsCol || !answersCol) return;

    function alignAnswer(btn, answer) {
        const questionsRect = questionsCol.getBoundingClientRect();
        const answersRect = answersCol.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const offsetY = btnRect.top - questionsRect.top;
        const relativeOffset = offsetY;

        answer.style.transform = `translateY(${relativeOffset}px)`;
        answersCol.style.height = answer.offsetHeight + relativeOffset + 'px';
    }

    function setActive(id) {
        questionButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-faq') === id;
            btn.classList.toggle('faq__question--active', isActive);
        });

        answers.forEach(answer => {
            const isActive = answer.getAttribute('data-faq') === id;
            answer.classList.toggle('faq__answer--active', isActive);
            if (!isActive) {
                answer.style.transform = 'translateY(0)';
            }
        });

        const activeBtn = questionButtons.find(btn => btn.getAttribute('data-faq') === id);
        const activeAnswer = answers.find(a => a.getAttribute('data-faq') === id);

        if (activeBtn && activeAnswer) {
            alignAnswer(activeBtn, activeAnswer);
        }
    }

    questionButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = btn.getAttribute('data-faq');
            setActive(id);
        });
    });

    window.addEventListener('resize', function () {
        const activeBtn = questionButtons.find(btn => btn.classList.contains('faq__question--active'));
        const activeAnswer = answers.find(a => a.classList.contains('faq__answer--active'));
        if (activeBtn && activeAnswer) {
            alignAnswer(activeBtn, activeAnswer);
        }
    });

    const initialId = questionButtons[0].getAttribute('data-faq');
    setActive(initialId);
});
