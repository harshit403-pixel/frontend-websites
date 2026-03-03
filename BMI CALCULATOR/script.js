  let unit = 'metric';
  let history = JSON.parse(localStorage.getItem('bmi_history') || '[]');

  const colors = {
    Underweight: 'var(--underweight)',
    Normal: 'var(--normal)',
    Overweight: 'var(--overweight)',
    Obese: 'var(--obese)'
  };

  function setUnit(u) {
    unit = u;
    document.getElementById('btn-metric').classList.toggle('active', u === 'metric');
    document.getElementById('btn-imperial').classList.toggle('active', u === 'imperial');
    document.getElementById('unit-height').textContent = u === 'metric' ? 'cm' : 'in';
    document.getElementById('unit-weight').textContent = u === 'metric' ? 'kg' : 'lbs';
    document.getElementById('height').placeholder = u === 'metric' ? '170' : '67';
    document.getElementById('weight').placeholder = u === 'metric' ? '70' : '154';
    document.getElementById('result').classList.remove('show');
    document.getElementById('error-msg').classList.remove('show');
  }

  function getCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25)   return 'Normal';
    if (bmi < 30)   return 'Overweight';
    return 'Obese';
  }

  function bmiToPercent(bmi) {
    // Map BMI 10–40 to 0–100%
    return Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
  }

  function calculate() {
    const hVal = parseFloat(document.getElementById('height').value);
    const wVal = parseFloat(document.getElementById('weight').value);
    const err = document.getElementById('error-msg');

    if (!hVal || !wVal || hVal <= 0 || wVal <= 0) {
      err.classList.add('show');
      document.getElementById('result').classList.remove('show');
      return;
    }
    err.classList.remove('show');

    let bmi;
    if (unit === 'metric') {
      const hm = hVal / 100;
      bmi = wVal / (hm * hm);
    } else {
      bmi = (703 * wVal) / (hVal * hVal);
    }

    bmi = Math.round(bmi * 100) / 100;
    const cat = getCategory(bmi);
    const color = colors[cat];
    const pct = bmiToPercent(bmi);

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-value').style.color = color;
    document.getElementById('bmi-cat').textContent = cat;
    document.getElementById('bmi-cat').style.color = color;
    document.getElementById('bar-fill').style.width = pct + '%';
    document.getElementById('bar-fill').style.background = color;
    document.getElementById('bar-marker').style.left = pct + '%';
    document.getElementById('result').classList.add('show');

    // Save to history
    const now = new Date();
    const entry = {
      bmi: bmi.toFixed(1),
      cat,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    history.unshift(entry);
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem('bmi_history', JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    const container = document.getElementById('history');
    const list = document.getElementById('history-list');
    if (history.length === 0) { container.style.display = 'none'; return; }
    container.style.display = 'block';
    list.innerHTML = history.map(h => `
      <div class="history-item">
        <div>
          <span class="h-bmi">${h.bmi}</span>
          <span class="h-cat" style="margin-left:10px;color:${colors[h.cat]}">${h.cat}</span>
        </div>
        <span class="h-time">${h.time}</span>
      </div>
    `).join('');
  }

  // Keyboard: Enter to calculate
  document.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });

  renderHistory();