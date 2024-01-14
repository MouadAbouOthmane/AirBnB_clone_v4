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
const checkStatus = () => {
  $.get('http://0.0.0.0:5001/api/v1/status/',
    function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').RemoveClass('available');
      }
    },
    'Json'
  );
};

// Display all places
const displayPlaces = (data) => {
  const sectionPlaces = $('section.places');
  $(sectionPlaces).text('');
  data.forEach(el => {
    const place = `
    <article>
        <div class="title_box">
          <h2>${el.name}</h2>
          <div class="price_by_night">$${el.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${el.max_guest} Guests</div>
          <div class="number_rooms">${el.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${el.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">
          ${el.description}              
        </div>
      </article>
    `;
    $(sectionPlaces).append(place);
  });
};

// Retrive all places
const placeSearch = () => {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json;charset=UTF-8',
    success: function (response) {
      displayPlaces(response);
    }
  });
};

// Retrieve all places By amenities
const getPlaceByAmenities = (data) => {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: `{"amenities": ${JSON.stringify(data)}}`,
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8',
    success: function (response) {
      displayPlaces(response);
    }
  });
};

$(function () {
  checkStatus();
  placeSearch();
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
  // when button tag is clicked
  $('button[type=button').on('click', function () {
    getPlaceByAmenities(ls);
  });
});
