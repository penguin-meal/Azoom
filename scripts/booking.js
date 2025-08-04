//hard coded cars array
var items = [
  {
    name: "Hyundai IONIQ 6",
    description: "The electrified steamliner",
    img: "../images/hyundai-tuscan.png",
    price: 79.86,
    carSelected: false,
    cdw: null
  },

  {
    name: "Tesla Model 3",
    description: "Performance",
    img: "../images/tesla-model-x.png",
    price: 104.22,
    carSelected: false,
    cdw: null
  },

  {
    name: "Audi A3",
    description: "Every drive starts here",
    img:"../images/audi-a3.png",
    price: 59.86,
    carSelected: false,
    cdw: null
  },

  {
    name: "Kia Soul EV",
    description: "All electric subcompact hatchback",
    img: "../images/kia-soul-ev.png",
    price: 42.31,
    carSelected: false,
    cdw: null
  }
]

var descriptionAddOns = [
  {
    id: "addDriverOption",
    title: "Additional Driver",
    description:
      "Upload driving license of all additional drivers. You will receive an email once we have verified that the additional drivers are eligible.\nAlternatively, you may provide the driving licenses of all drivers during collection of the vehicle at our branch offices"
  },

  {
    id: "pInsuranceOption",
    title: "Personal Accident Insurance",
    description: "Personal Accident Insurance (PAI) is a valuable add-on for car rentals, offering coverage for medical expenses and accidental injury for both the driver and passengers during the rental period.\nIn the unfortunate event of an accident, PAI provides financial assistance for medical treatment, ambulance services, and accidental death benefits, ensuring that you and your loved ones are protected while on the road.\n This affordable coverage brings extra peace of mind during your rental experience, allowing you to travel with confidence, knowing you're prepared for unexpected medical emergencies."
  },

  {
    id: "childSeatOption",
    title: "Child Seat",
    description: "A Child Seat add-on ensures the safety and comfort of your little ones during your journey.\nComplying with all safety regulations, our child seats are designed to provide optimal protection for infants and young children. Whether you're on a short trip or a long drive, this add-on guarantees that your child is securely fastened and comfortable throughout the ride.\nOffering peace of mind for families, the child seat option helps ensure a safe and smooth journey, allowing you to focus on the road ahead while keeping your children protected."

  },

  {
    id: "returnOption",
    title: "Alternative Return Location",
    description: "The Designated Return Location add-on provides you with the flexibility to return your rental car at a different location from where you picked it up\nThis convenient option is perfect for one-way trips, saving you time and hassle by allowing you to drop off the vehicle at a location more suited to your travel plans\nWhether you’re traveling between cities or making an extended road trip, this add-on offers greater convenience and freedom, giving you the flexibility to plan your journey without worrying about returning to your original starting point."
  }

]

// Search pop up enabled
function enableEdit () {
  const searchDiv = document.getElementById("searchBarAlignment");
  const currentDisplay = window.getComputedStyle(searchDiv).display;

  if (currentDisplay === "none") {
    searchDiv.style.display ="flex";
  } else {
    searchDiv.style.display = "none";
  }
}

function loadDisplayInfo() {
  var bookingData = JSON.parse(localStorage.getItem('bookingData'));
  
  if (bookingData) {
    document.getElementById('display-pickup-loc').textContent = `${bookingData.pickuploc}`
    document.getElementById('display-pickup-date').textContent = `${bookingData.pickupdate}`
    document.getElementById('display-return-date').textContent = `${bookingData.returndate}`

    //calculate days between dates
    var pickUpDateObj = new Date(bookingData.pickupdate);
    var returnDateObj = new Date(bookingData.returndate);
  
    var differenceMS = returnDateObj - pickUpDateObj;
    var days = differenceMS / (1000 * 60 * 60 * 24);
    const itemsContainer = document.getElementById('selection-section');

    // add 'days' property to bookingData ( will be stored to local storage later)
    bookingData.days = days;

    items.forEach (item => {
      // create car display elements for each item
      var totalPrice = parseFloat((item.price * days).toFixed(2)); //2decimal palces
      const carDiv = document.createElement('div');
      carDiv.classList.add('selection');
      carDiv.onclick

      // add a onclick event to run a function
      carDiv.onclick = function() {
        items.forEach(i => i.carSelected = false);
        item.carSelected = true;

        // save items to local storage
        localStorage.setItem('items', JSON.stringify(items)); 
        localStorage.setItem('bookingData', JSON.stringify(bookingData));

        window.location.href = 'cdw.html';
      
      }

      carDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="card-pax">
        <img src="../icons/user.svg" alt="pax">
        <p class="user-pax">5</p>
      </div>
      <img class="car-img" src="${item.img}" alt="${item.name}">
      <div class="price-per-day">
        <p class="car-price">$${item.price}</p><p>/day</p>
      </div>
      <p class="car-total-price">Total: $${totalPrice}</p>
      `;


      itemsContainer.appendChild(carDiv);
      item.totalPrice = totalPrice;
      
    });
    localStorage.setItem('items', JSON.stringify(items));
  }
}

function submitSearch() {
  var pickUpLoc = document.getElementById("pickup-loc").value;
  var pickUpDate = document.getElementById("pickup-date").value;
  var returnDate = document.getElementById("return-date").value;

  if (!pickUpLoc || !pickUpDate || !returnDate) {
    alert("Please fill out all required fields.");
    return;
  }

  var bookingData = {
    pickuploc : pickUpLoc,
    pickupdate : pickUpDate,
    returndate : returnDate
  };

  localStorage.setItem('bookingData',JSON.stringify(bookingData));

  // redirect to booking.html
  window.location.href = 'booking.html';
}

//////////////////////////////////////////////
// shows on CDW page
function changeSelected(element) {
  var items = JSON.parse(localStorage.getItem('items'));
  const allBoxes = document.querySelectorAll('.selection-card');
  const cdwName = element.querySelector('h3').innerHTML;
  var cdwPrice = 0;

  allBoxes.forEach (box => box.classList.remove('active'));
  element.classList.add('active');

  if (cdwName == "Basic CDW") {
    cdwPrice = 0;
  } else if (cdwName == "Third-Party Liability") {
    cdwPrice = 20.15;
  } else {
    cdwPrice = 37.32;
  }

  items.forEach (i => {
    if (i.carSelected == true) {
      i.cdw = cdwPrice; //sets cdwPrice
      i.cdwName = cdwName; //sets cdwName
    }
    localStorage.setItem('items', JSON.stringify(items));
  });

  calculatePriceDetails();
}

// only used for first load
function displayPrice() {
  var items = JSON.parse(localStorage.getItem('items'));
  var priceText = document.getElementById('price');
  var displayTotalPrice = 0;

  items.forEach (i => {
    if (i.carSelected == true) {
      displayTotalPrice = i.totalPrice; //sets totalPrice to display
    }
    priceText.textContent = "$" + displayTotalPrice;
  });
}

function displayPriceDetails() {
  var priceDetails = document.getElementById('price-details');
  // handles pop up display and scroll
  priceDetails.style.display = 'block';
  document.body.classList.add('no-scroll');
}


// for pop up of price details 
function calculatePriceDetails() {
  var items = JSON.parse(localStorage.getItem('items'));
  var bookingData = JSON.parse(localStorage.getItem('bookingData'));

  var total = 0; // for calculating total Amt
  var priceText = document.getElementById('price');

  // gets all required fields
  const days = document.getElementById('numDays');
  const priceDay = document.getElementById('priceDay');
  const rentAmt = document.getElementById('amtRental');
  const cdw = document.getElementById('pd-cdwAmt');
  const cdwName = document.getElementById('pd-cdwName');
  const totalAmt = document.getElementById('pd-totalAmt');
    // for addons
  const addDriver = document.getElementById('additional-driver');
  const driverAmt = document.getElementById('amtAddDriver');
  const addDriverCost = 30;
  const addDriverLine = document.getElementById('add-driver-line');

  const pInsurance = document.getElementById('personal-insurance');
  const insuranceAmt = document.getElementById('amtPInsurance');
  const insuranceCost = 6.25;
  const insuranceLine = document.getElementById('insurance-line');

  const childSeat = document.getElementById('child-seat-add-on');
  const childSeatAmt = document.getElementById('amtChildSeat');
  const childSeatCost = 5;
  const childSeatLine = document.getElementById('childSeatLine');

  const returnLoc = document.getElementById('return-loc-add-on');
  const returnLocAmt = document.getElementById('amtReturnLoct');
  const returnLocCost = 30;
  const returnLocLine = document.getElementById('returnLocLine');

  // sets fields
  days.textContent = bookingData.days;
  
  // sets the fields inside items array
  items.forEach (i => {
    if (i.carSelected == true) {
      // sets the needed fields
      priceDay.textContent = "$" + i.price.toFixed(2); 
      rentAmt.textContent = "$" + i.totalPrice.toFixed(2);
      total += i.totalPrice;
      
      // if cdw is not selected yet, will not show
      if (i.cdw != null) {
        cdw.textContent = "$" + (i.cdw * bookingData.days).toFixed(2);
        cdwName.textContent = i.cdwName;
        total += (i.cdw * bookingData.days);
      } 
    }
  })
  
  // show / hide additional Driver add on
  if (bookingData.addDriver) {
    addDriver.textContent = "Additional Driver";
    driverAmt.textContent = "$" + (addDriverCost * bookingData.days).toFixed(2);
    addDriverLine.style.display = 'flex';
    total += (addDriverCost * bookingData.days);
  } else if (bookingData.addDriver == null) {
    console.log("addDriver is null");
  } else {
    addDriver.textContent = "";
    driverAmt.textContent = "";
    addDriverLine.style.display = 'none';
  }

  if (bookingData.pInsurance) {
    pInsurance.textContent = "Personal Accident Insurance";
    insuranceAmt.textContent = "$" + (insuranceCost * bookingData.days).toFixed(2);
    insuranceLine.style.display = 'flex';
    total += (insuranceCost * bookingData.days);
  } else if (bookingData.pInsurance == null){
    console.log("pInsurance is null")
  } else {
    pInsurance.textContent = "";
    insuranceAmt.textContent = "";
    insuranceLine.style.display = 'none'
  }

  if (bookingData.childSeat) {
    childSeat.textContent = "Child Seat";
    childSeatAmt.textContent = "$" + (childSeatCost * bookingData.days).toFixed(2);
    childSeatLine.style.display = 'flex';
    total += (childSeatCost * bookingData.days);
  } else if (bookingData.childSeat == null) {
    console.log("childSeat is null");
  } else {
    childSeat.textContent = "";
    childSeatAmt.textContent = "";
    childSeatLine.style.disply = 'none';
  }

  if (bookingData.returnLoc) {
    returnLoc.textContent = "Alternative Return Location";
    returnLocAmt.textContent = "$" + returnLocCost.toFixed(2);
    returnLocLine.style.display = 'flex';
    total += (returnLocCost);
  } else if (bookingData.returnLoc == null) {
    console.log("returnLoc is null");
  } else {
    returnLoc.textContent = "";
    returnLocAmt.textContent = "";
    returnLocLine.style.display = 'none';
  }
  
  totalAmt.textContent = "$" + total.toFixed(2);

  //updates total price outside pop up
  priceText.textContent = "$" + total.toFixed(2);

  items.totalPrice = total;
  localStorage.setItem('items', JSON.stringify(items));
}

function closePriceDetails() {
  var priceDetails = document.getElementById('price-details');
  var submitDiv = document.getElementById('submit-div');

  if (priceDetails.style.display == 'block') {
    priceDetails.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  if (submitDiv) {
    submitDiv.remove();
  }
}

function addOnPage() {
  window.location.href = 'add-ons.html';
}

// Add on page js (may mix some on calculatePrice())
function chkToggledAddOns() {
  //add ons will be added to booking data local storage
  var bookingData = JSON.parse(localStorage.getItem('bookingData'));
  const addDriver = document.getElementById('add-driver');
  const pInsurance = document.getElementById('p-insurance');
  const childSeat = document.getElementById('child-seat');
  const returnLoc = document.getElementById('return-loc');

  const alternateReturnLoc = document.getElementById('return-loc-text');

  if (addDriver.checked) {
    bookingData.addDriver = true;
  } else {
    bookingData.addDriver = false;
  }

  if (pInsurance.checked) {
    bookingData.pInsurance = true;
  } else {
    bookingData.pInsurance = false;
  }
  
  if (childSeat.checked) {
    bookingData.childSeat = true;
  } else {
    bookingData.childSeat = false;
  }

  if (returnLoc.checked) {
    bookingData.returnLoc = true;
    alternateReturnLoc.disabled = false;
  } else {
    bookingData.returnLoc = false;
    alternateReturnLoc.disabled = true;
  }

  localStorage.setItem('bookingData', JSON.stringify(bookingData));
  console.log(bookingData);
  calculatePriceDetails(); //calculates price 
}

//changing desc on add on page, select the option to change
function changeSelectedDesc(element) {
  var allOptions = document.querySelectorAll('.option');
  var title = document.getElementById('add-on-title');
  var desc = document.getElementById('add-on-desc');

  // changes which is selected
  allOptions.forEach (op => op.classList.remove('active'));
  element.classList.add('active');

  // changes desc
  descriptionAddOns.forEach ( d => {
    if(d.id == element.id) {
      title.textContent = d.title;
      desc.innerHTML = d.description.split('\n').join('<br><br>');
    }
  })
  }

function insertBtn() {
  var newBtn = document.createElement('button');
  var newDiv = document.createElement('div');
  newBtn.textContent = 'Book Now';
  newBtn.className = 'primary-btn';
  newDiv.id = 'submit-div'
  newDiv.className = 'book-now-space';

  newBtn.onclick = function () {
    window.location.href = 'payment.html';
  }

  var popupContent = document.getElementById('popup-content');
  newDiv.appendChild(newBtn);
  popupContent.appendChild(newDiv);
}