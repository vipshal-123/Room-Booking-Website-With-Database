// JavaScript code to handle city and hotel selection
const citySelect = document.getElementById('city');
const hotelSelect = document.getElementById('hotel');
const peopleSelect = document.getElementById('people');
const checkInDateInput = document.getElementById('check-in-date');
const checkOutDateInput = document.getElementById('check-out-date');
const phoneNumberInput = document.getElementById('number');

// Hotels for each city
const hotelsByCity = {
    'Coimbatore': ['FabHotel Sam Residency Rs: 800/Day', 'Itsy By Treebo - Jansi Residenc Rs: 600/Day', 'MK Residency Rs: 1000/Day'],
    'Chennai': ['The Madras Grand Rs: 1100/Day', 'Taj Club House Rs: 1000/Day', 'Savera Hotel Rs: 900/Day'],
    'Kanyakumari': ['Hotel Ocean Heritage Rs: 750/Day', 'Melody Park Rs: 500/Day', 'Hotel Raja Palace Rs: 600/Day']
};

citySelect.addEventListener('change', function() {
    const selectedCity = citySelect.value;

    // Clear existing options
    hotelSelect.innerHTML = '';

    // Enable or disable hotel selection based on city selection
    if (selectedCity) {
        const hotels = hotelsByCity[selectedCity];
        // Populate hotel options
        for (let i = 0; i < hotels.length; i++) {
            const option = document.createElement('option');
            option.value = hotels[i];
            option.text = hotels[i];
            hotelSelect.appendChild(option);
        }
        hotelSelect.disabled = false;
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.text = 'Select Hotel';
        hotelSelect.appendChild(option);
        hotelSelect.disabled = true;
    }
});

function changeOptionColor(selectElement) {
    var options = selectElement.options;
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.selected) {
            option.style.backgroundColor = "#ffca00";
            option.style.color = "#000";
        } else {
            option.style.backgroundColor = "#000";
            option.style.color = "#fff";
        }
    }
}

function redirectToPayment(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the selected values from the form
    var city = document.getElementById('city').value;
    var hotel = document.getElementById('hotel').value;
    var people = parseInt(peopleSelect.value); // Get the selected number of people
    var checkInDate = checkInDateInput.value;
    var checkOutDate = checkOutDateInput.value;
    var phoneNumber = phoneNumberInput.value;
    var hotelPrice = getHotelPrice(hotel, people); // Calculate the total price

    // Construct the query string
    var queryString = '?city=' + encodeURIComponent(city) +
                      '&hotel=' + encodeURIComponent(hotel) +
                      '&people=' + encodeURIComponent(people) +
                      '&check-in-date=' + encodeURIComponent(checkInDate) +
                      '&check-out-date=' + encodeURIComponent(checkOutDate) +
                      '&number=' + encodeURIComponent(phoneNumber) +
                      '&hotel-price=' + encodeURIComponent(hotelPrice);

    // Redirect to payment.html with the query string
    window.location.href = 'payment.html' + queryString;
}

function getHotelPrice(hotel, people) {
    // Set the price based on the selected hotel and multiply by the number of people
    switch (hotel) {
        case 'FabHotel Sam Residency Rs: 800/Day':
            return 800 * people;
        case 'Itsy By Treebo - Jansi Residenc Rs: 600/Day':
            return 600 * people;
        case 'MK Residency Rs: 1000/Day':
            return 1000 * people;
        case 'The Madras Grand Rs: 1100/Day':
            return 1100 * people;
        case 'Taj Club House Rs: 1000/Day':
            return 1000 * people;
        case 'Savera Hotel Rs: 900/Day':
            return 900 * people;
        case 'Hotel Ocean Heritage Rs: 750/Day':
            return 750 * people;
        case 'Melody Park Rs: 500/Day':
            return 500 * people;
        case 'Hotel Raja Palace Rs: 600/Day':
            return 600 * people;
        default:
            return 0;
    }
}
