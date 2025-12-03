window.onload = function() {
  var first = document.getElementsByName('credit1')[0];
  if (first) { first.focus(); }
  document.getElementById('calcBtn').onclick = calculateGPA;
  document.getElementById('resetGpaBtn').onclick = resetGPA;
};

function letterToPoint(letter) {
  if (!letter) return null;
  var l = letter.trim().toUpperCase();
  if (l === 'A') return 4;
  if (l === 'B') return 3;
  if (l === 'C') return 2;
  if (l === 'D') return 1;
  if (l === 'F') return 0;
  return null;
}

function calculateGPA() {
  var totalPoints = 0;
  var totalCredits = 0;
  var countRows = 0;
  for (var i=1;i<=5;i++) {
    var c = document.getElementsByName('credit' + i)[0].value;
    var g = document.getElementsByName('grade' + i)[0].value;
    if ( (c && c.trim() !== '') || (g && g.trim() !== '') ) {
      // require both
      if (!c || c.trim() === '' || !g || g.trim() === '') {
        alert('Please provide both Credit Hours and Grade for any row you include.');
        return;
      }
      var credit = parseFloat(c);
      if (isNaN(credit) || credit <= 0) {
        alert('Credit hours must be a positive number.');
        return;
      }
      var pt = letterToPoint(g);
      if (pt === null) {
        alert('Invalid grade: ' + g + '. Use A, B, C, D, or F.');
        return;
      }
      totalPoints += pt * credit;
      totalCredits += credit;
      countRows++;
    }
  }
  if (countRows < 2) {
    alert('Please enter at least 2 courses to calculate GPA.');
    return;
  }
  if (totalCredits === 0) {
    alert('Total credits must be greater than zero.');
    return;
  }
  var gpa = totalPoints / totalCredits;
  document.getElementById('gpaOut').value = gpa.toFixed(2);
}

function resetGPA() {
  for (var i=1;i<=5;i++) {
    document.getElementsByName('credit' + i)[0].value = '';
    document.getElementsByName('grade' + i)[0].value = '';
  }
  document.getElementById('gpaOut').value = '';
  var first = document.getElementsByName('credit1')[0];
  if (first) first.focus();
}
