// JavaScript code to handle payment logic

// Function to retrieve query parameters from the URL
function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the query parameters and populate the input fields
window.addEventListener('DOMContentLoaded', function () {
    var selectedCity = getQueryParameter('city');
    var selectedHotel = getQueryParameter('hotel');
    var selectedPeople = getQueryParameter('people');
    var checkInDate = getQueryParameter('check-in-date');
    var checkOutDate = getQueryParameter('check-out-date');
    var phoneNumber = getQueryParameter('number');
    var hotelPrice = parseInt(getQueryParameter('hotel-price'));

    if (isNaN(hotelPrice)) {
        hotelPrice = 0;
    }

    document.getElementById('selected-city').value = selectedCity;
    document.getElementById('selected-hotel').value = selectedHotel;
    document.getElementById('selected-people').value = selectedPeople;
    document.getElementById('check-in-date').value = checkInDate;
    document.getElementById('check-out-date').value = checkOutDate;
    document.getElementById('number').value = phoneNumber;
    document.getElementById('hotel-price').value = hotelPrice;
});
