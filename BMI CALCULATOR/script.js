var mode = 'metric'
var log = []

try { log = JSON.parse(localStorage.getItem('bmi_log') || '[]') } catch(e) {}

var colors = {
  underweight: '#5b8dd9',
  normal: '#4ade80',
  overweight: '#f59e0b',
  obese: '#f87171'
}

document.querySelectorAll('.switch-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    mode = btn.getAttribute('data-unit')

    document.querySelectorAll('.switch-btn').forEach(function(b) {
      b.classList.remove('active')
    })
    btn.classList.add('active')

    if (mode === 'metric') {
      document.querySelector('#uh').textContent = 'cm'
      document.querySelector('#uw').textContent = 'kg'
      document.querySelector('#h').placeholder = '170'
      document.querySelector('#w').placeholder = '70'
    } else {
      document.querySelector('#uh').textContent = 'in'
      document.querySelector('#uw').textContent = 'lbs'
      document.querySelector('#h').placeholder = '67'
      document.querySelector('#w').placeholder = '154'
    }

    document.querySelector('#out').classList.remove('on')
    document.querySelector('#err').classList.remove('on')
  })
})

document.querySelector('#go').addEventListener('click', calc)

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') calc()
})

function calc() {
  var h = parseFloat(document.querySelector('#h').value)
  var w = parseFloat(document.querySelector('#w').value)

  if (!h || !w || h <= 0 || w <= 0) {
    document.querySelector('#err').classList.add('on')
    document.querySelector('#out').classList.remove('on')
    return
  }

  document.querySelector('#err').classList.remove('on')

  var bmi

  if (mode === 'metric') {
    var hm = h / 100
    bmi = w / (hm * hm)
  } else {
    bmi = (703 * w) / (h * h)
  }

  bmi = Math.round(bmi * 100) / 100

  var category

  if (bmi < 18.5) {
    category = 'underweight'
  } else if (bmi < 25) {
    category = 'normal'
  } else if (bmi < 30) {
    category = 'overweight'
  } else {
    category = 'obese'
  }

  var color = colors[category]
  var pos = ((bmi - 10) / 30) * 100
  if (pos > 100) pos = 100
  if (pos < 0) pos = 0

  document.querySelector('#bnum').textContent = bmi.toFixed(1)
  document.querySelector('#bnum').style.color = color
  document.querySelector('#bcat').textContent = category
  document.querySelector('#bcat').style.color = color
  document.querySelector('#tfill').style.width = pos + '%'
  document.querySelector('#tfill').style.background = color
  document.querySelector('#tpin').style.left = pos + '%'

  document.querySelector('#out').classList.add('on')

  var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  log.unshift({ bmi: bmi.toFixed(1), cat: category, t: time })
  if (log.length > 5) log.pop()

  try { localStorage.setItem('bmi_log', JSON.stringify(log)) } catch(e) {}

  showLog()
}

function showLog() {
  if (log.length === 0) {
    document.querySelector('#hwrap').classList.remove('on')
    return
  }

  document.querySelector('#hwrap').classList.add('on')

  var html = ''

  for (var i = 0; i < log.length; i++) {
    var item = log[i]
    html += '<li class="hist-item">'
    html += '<span>'
    html += '<span class="h-val">' + item.bmi + '</span>'
    html += '<span class="h-cat" style="color:' + colors[item.cat] + '">' + item.cat + '</span>'
    html += '</span>'
    html += '<span class="h-time">' + item.t + '</span>'
    html += '</li>'
  }

  document.querySelector('#hlist').innerHTML = html
}

showLog()