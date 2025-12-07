document.addEventListener('DOMContentLoaded', function () {
    const questions = Array.from(document.querySelectorAll('.faq__question'));
    const answers = Array.from(document.querySelectorAll('.faq__answer'));
    const questionsCol = document.querySelector('.faq__questions');
    const answersCol = document.querySelector('.faq__answers');

    if (!questions.length || !answers.length || !questionsCol || !answersCol) return;

    function isMobile() {
        return window.innerWidth < 768;
    }

    function placeAnswersForMobile() {
        answers.forEach(answer => {
            const id = answer.getAttribute('data-faq');
            const btn = document.querySelector('.faq__question[data-faq="' + id + '"]');
            if (btn && answer.previousElementSibling !== btn) {
                btn.insertAdjacentElement('afterend', answer);
            }
        });
    }

    function placeAnswersForDesktop() {
        answers.forEach(answer => {
            if (answer.parentElement !== answersCol) {
                answersCol.appendChild(answer);
            }
        });
    }

    function alignAnswerDesktop(btn, answer) {
        const questionsRect = questionsCol.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const offsetY = btnRect.top - questionsRect.top;
        answer.style.transform = 'translateY(' + offsetY + 'px)';
        answersCol.style.height = answer.offsetHeight + offsetY + 'px';
    }

    function setActive(id, toggleAllowed) {
        const targetBtn = questions.find(b => b.getAttribute('data-faq') === id);
        const targetAnswer = answers.find(a => a.getAttribute('data-faq') === id);
        if (!targetBtn || !targetAnswer) return;

        if (isMobile()) {
            const isAlreadyActive = targetBtn.classList.contains('faq__question--active');

            if (toggleAllowed && isAlreadyActive) {
                questions.forEach(btn => btn.classList.remove('faq__question--active'));
                answers.forEach(ans => ans.classList.remove('faq__answer--active'));
                return;
            }

            questions.forEach(btn => {
                btn.classList.toggle('faq__question--active', btn === targetBtn);
            });

            answers.forEach(ans => {
                ans.classList.toggle('faq__answer--active', ans === targetAnswer);
            });
        } else {
            questions.forEach(btn => {
                btn.classList.toggle('faq__question--active', btn === targetBtn);
            });

            answers.forEach(ans => {
                const isCurrent = ans === targetAnswer;
                ans.classList.toggle('faq__answer--active', isCurrent);
                if (!isCurrent) {
                    ans.style.transform = 'translateY(0)';
                }
            });

            alignAnswerDesktop(targetBtn, targetAnswer);
        }
    }

    function handleLayout() {
        const activeBtn = questions.find(b => b.classList.contains('faq__question--active')) || questions[0];
        const currentId = activeBtn ? activeBtn.getAttribute('data-faq') : '1';

        if (isMobile()) {
            placeAnswersForMobile();
        } else {
            placeAnswersForDesktop();
        }

        setActive(currentId, false);
    }

    questions.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = btn.getAttribute('data-faq');
            setActive(id, true); // на мобиле разрешаем закрывать повторным кликом
        });
    });

    window.addEventListener('resize', handleLayout);

    handleLayout();
});
