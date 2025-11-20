      const quizDiv = document.getElementById('quiz');
    const nextBtn = document.getElementById('nextBtn');
    const subjectSelect = document.getElementById('subjectSelect');

    let questions = [];
    let currentQuestion = 0;

    async function loadQuestions(subject) {
      try {
        const res = await fetch(`./public/data/BECE/${subject}.json`);
        questions = await res.json();
        currentQuestion = 0;
        showQuestion();
      } catch (error) {
        quizDiv.innerHTML = "<p style='color:red;'>Failed to load questions. Make sure JSON files exist.</p>";
      }
    }

    function showQuestion() {
      if (currentQuestion >= questions.length) {
        quizDiv.innerHTML = "<h3>🎉 You have completed the demo quiz!</h3>";
        nextBtn.style.display = "none";
        return;
      }

      const q = questions[currentQuestion];
      quizDiv.innerHTML = `
        <div class="question">${q.id}. ${q.question}</div>
        <div class="options">
          <button onclick="checkAnswer('A')">A. ${q.options.A}</button>
          <button onclick="checkAnswer('B')">B. ${q.options.B}</button>
          <button onclick="checkAnswer('C')">C. ${q.options.C}</button>
          <button onclick="checkAnswer('D')">D. ${q.options.D}</button>
        </div>
        <div class="answer" id="answer"></div>
      `;
    }

    function checkAnswer(selected) {
      const q = questions[currentQuestion];
      const answerDiv = document.getElementById('answer');
      if (selected === q.answer) {
        answerDiv.innerHTML = `✅ Correct! Explanation: ${q.explanation}`;
      } else {
        answerDiv.innerHTML = `❌ Wrong! Correct answer: ${q.answer}. ${q.explanation}`;
      }


      const buttons = document.querySelectorAll('.options button');
      buttons.forEach(btn => btn.disabled = true);
    }

    nextBtn.addEventListener('click', () => {
      currentQuestion++;
      showQuestion();
    });


    subjectSelect.addEventListener('change', () => {
      nextBtn.style.display = "inline";
      loadQuestions(subjectSelect.value);
    });


    loadQuestions(subjectSelect.value);

