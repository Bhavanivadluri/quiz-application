fetch('/questions')
  .then(response => response.json())
  .then(questions => {
    displayQuestions(questions);
    document.getElementById('quiz-container').dataset.questions = JSON.stringify(questions);
  })
  .catch(error => console.error('Error fetching questions:', error));

function displayQuestions(questions) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    let optionsHtml = '';
    q.options.forEach(opt => {
      optionsHtml += `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `;
    });

    questionDiv.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      ${optionsHtml}
    `;
    container.appendChild(questionDiv);
  });
}

document.getElementById('submit-btn').addEventListener('click', () => {
  const questions = JSON.parse(document.getElementById('quiz-container').dataset.questions);
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  alert(`Your score is: ${score} / ${questions.length}`);
});
