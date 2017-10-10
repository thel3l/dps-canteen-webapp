<<<<<<< HEAD
var mySelect = $('#first-disabled2');

$('#special').on('click', function () {
  mySelect.find('option:selected').prop('disabled', true);
  mySelect.selectpicker('refresh');
});

$('#special2').on('click', function () {
  mySelect.find('option:disabled').prop('disabled', false);
  mySelect.selectpicker('refresh');
});

$('#basic2').selectpicker({
  liveSearch: true,
  maxOptions: 1
});

function goToHome(){
  location.href = "index.html"
}
=======
var mySelect = $('#first-disabled2');

$('#special').on('click', function () {
  mySelect.find('option:selected').prop('disabled', true);
  mySelect.selectpicker('refresh');
});

$('#special2').on('click', function () {
  mySelect.find('option:disabled').prop('disabled', false);
  mySelect.selectpicker('refresh');
});

$('#basic2').selectpicker({
  liveSearch: true,
  maxOptions: 1
});

function goToHome(){
  location.href = "index.html"
}
>>>>>>> 4d340787f458f5f4126f7d8a44cc6cd5389d80f0
