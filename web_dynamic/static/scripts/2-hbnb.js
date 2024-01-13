// function print amenities checked
const printAmenities = (list) => {
  const amenitiesField = $('.amenities h4');

  let str = '';
  list.forEach((el, idx) => {
    if (idx !== 0) str += ', ';
    str += $(`input[data-id=${el}]`).data('name');
  });

  $(amenitiesField).text(str.slice(0, 30) + '...');
};

// function check the status
const checkStatus = () =>{
  $.get("http://0.0.0.0:5001/api/v1/status/", 
    function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').RemoveClass('available');
      }
    },
    "Json"
  );
}

$(function () {

  checkStatus();
  let ls = [];
  // lisen if input is checked or unchecked
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      ls.push($(this).data('id'));
      printAmenities(ls);
    } else {
      ls = ls.filter((el) => { return el !== $(this).data('id'); });
      printAmenities(ls);
    }
  });
});
