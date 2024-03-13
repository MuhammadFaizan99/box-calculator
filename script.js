// Object containing image URLs for each Product Name
const productImages = {
  mailer: "./Images/mailer.png",
  folding: "./Images/folding.jpg",
  rigid: "./Images/rigid.webp",
  magnetic: "./Images/magnetic.png",
  display: "./Images/display.jpg",
  tray_sleeve: "./Images/tray_sleeve.png",
  cardboard_tubes: "./Images/cardboard_tubes.jpg",
  foldable_lid_base: "./Images/foldable_lid_base.webp",
  cake: "./Images/cake.jpg",
  paper: "./Images/paper.jpg",
  pillow: "./Images/pillow.jpg",
  shipping: "./Images/shipping.jpg",
  rectangle: "./Images/Rectangle.webp",
  pizza: "./Images/Pizza Type.jpg",
  tuck_in: "./Images/tuck_in.webp"
};

// Object containing image URLs for each Paper Quality/Card Quality
const paperQualityImages = {
  kraft: "./Images/kraft.jpg",
  white: "./Images/white.webp",
  corrugated: "./Images/corrugated.jpg",
  coated: "./Images/coated.jpg",
  fbb: "./Images/fbb.webp"
};

// Function to display selected images
function displaySelectedImages() {
  const productName = document.getElementById("productName").value;
  const paperQuality = document.getElementById("paperQuality").value;
  const productImage = productImages[productName];
  const paperQualityImage = paperQualityImages[paperQuality];
  const productImageContainer = document.getElementById("productImageContainer");
  const paperQualityImageContainer = document.getElementById("paperQualityImageContainer");

  // Clear previous images
  productImageContainer.innerHTML = "";
  paperQualityImageContainer.innerHTML = "";

  // Insert Product Name image
  if (productImage) {
    const productImg = document.createElement("img");
    productImg.src = productImage;
    productImg.alt = productName;
    productImageContainer.appendChild(productImg);
    productImg.classList.add("fade-in"); // Add fade-in class
  }

  // Insert Paper Quality image
  if (paperQualityImage) {
    const paperQualityImg = document.createElement("img");
    paperQualityImg.src = paperQualityImage;
    paperQualityImg.alt = paperQuality;
    paperQualityImageContainer.appendChild(paperQualityImg);
    paperQualityImg.classList.add("fade-in"); // Add fade-in class
  }
}

// Function to calculate the price and display the result
function calculatePrice() {
  const productName = document.getElementById("productName").value;
  const paperQuality = document.getElementById("paperQuality").value;
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  let sizeUnit;
  const unitInches = document.getElementById("unitInches");
  const unitMm = document.getElementById("unitMm");
  const unitCm = document.getElementById("unitCm");

  if (unitInches.classList.contains("active")) {
    sizeUnit = "inches";
  } else if (unitMm.classList.contains("active")) {
    sizeUnit = "mm";
  } else if (unitCm.classList.contains("active")) {
    sizeUnit = "cm";
  }

  const color = document.getElementById("color").value;
  const print = document.getElementById("print").value;
  const coating = document.getElementById("coating").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  // Validation
  const errorMessages = [];
  if (!productName) errorMessages.push("Product Name");
  if (!paperQuality) errorMessages.push("Paper Quality");
  if (isNaN(length)) errorMessages.push("Length");
  if (isNaN(width)) errorMessages.push("Width");
  if (isNaN(height)) errorMessages.push("Height");
  if (!color) errorMessages.push("Color");
  if (!print) errorMessages.push("Print");
  if (!coating) errorMessages.push("Coating");
  if (!quantity) errorMessages.push("Quantity");

  if (errorMessages.length > 0) {
    const errorMessage = "Please fill in the following fields: " + errorMessages.join(", ");
    document.getElementById("result").innerHTML = `<span style="color: red;">${errorMessage}</span>`;
    return; // Exit function if there are validation errors
  }

  let size;
  switch (sizeUnit) {
    case "mm":
      size = {
        length: length / 25.4,
        width: width / 25.4,
        height: height / 25.4,
      };
      break;
    case "cm":
      size = {
        length: length / 2.54,
        width: width / 2.54,
        height: height / 2.54,
      };
      break;
    default:
      size = { length, width, height };
      break;
  }

  const areaOfBox = 2 * (
    size.length * size.width +
    size.length * size.height +
    size.width * size.height
  );
  const productBase = getProductBase(productName);
  const paperQualityBase = getPaperQualityBase(paperQuality);
  const colorBase = getColorBase(color);
  const printBase = getPrintBase(print);
  const coatingBase = getCoatingBase(coating);

  const price =
    quantity *
    (areaOfBox * productBase +
      areaOfBox * paperQualityBase +
      areaOfBox * colorBase +
      areaOfBox * printBase +
      areaOfBox * coatingBase);

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Price/Box: PKR ${(price.toFixed(2) / quantity).toFixed(2)}<br>Total Price of Box: PKR ${price.toFixed(2)}`;

  // Triggering fade-in effect
  resultElement.classList.add("show");
}

function getProductBase(productName) {
  switch (productName) {
    case "mailer":
      return 0.15;
    case "folding":
      return 0.15;
    case "rigid":
      return 0.2;
    case "magnetic":
      return 0.35;
    case "display":
      return 0.22;
    case "tray_sleeve":
      return 0.25;
    case "cardboard_tubes":
      return 0.15;
    case "foldable_lid_base":
      return 0.2;
    case "cake":
      return 0.03;
    case "paper":
      return 0.000005;
    case "pillow":
      return 0.3;
    case "shipping":
      return 0.2;
    case "rectangle":
      return 0.16;
    case "pizza":
      return 0.15;
    case "tuck_in":
      return 0.16;
    default:
      return 0;
  }
}

function getPaperQualityBase(paperQuality) {
  switch (paperQuality) {
    case "kraft":
      return 0.06;
    case "white":
      return 0.05;
    case "corrugated":
      return 0.05;
    case "coated":
      return 0.04;
    case "fbb":
      return 0.04;
    default:
      return 0;
  }
}

function getColorBase(color) {
  switch (color) {
    case "brown":
      return 0.04;
    case "white":
      return 0.06;
    default:
      return 0;
  }
}

function getPrintBase(print) {
  switch (print) {
    case "none":
      return 0.0;
    case "single":
      return 0.03;
    case "multi":
      return 0.06;
    default:
      return 0;
  }
}

function getCoatingBase(coating) {
  switch (coating) {
    case "thermalGloss":
      return 0.05;
    case "pvcLamination":
      return 0.05;
    case "emboss":
      return 0.06;
    case "silver":
      return 0.05;
    case "leafFull":
      return 0.08;
    case "hybridDripoff":
      return 0.04;
    case "varnishCoating":
      return 0.05;
    case "thermalMATT":
      return 0.05;
    case "spotUV":
      return 0.05;
    case "mattHalf":
      return 0.04;
    case "halfGlossLamination":
      return 0.06;
    case "mattLamination":
      return 0.05;
    case "glossLamination":
      return 0.06;
    case "leaf":
      return 0.06;
    case "none":
      return 0;
    default:
      return 0;
  }
}

// Function to change the unit of size input fields
function changeUnit(unit) {
  const unitInches = document.getElementById("unitInches");
  const unitMm = document.getElementById("unitMm");
  const unitCm = document.getElementById("unitCm");
  
  unitInches.classList.remove("active");
  unitMm.classList.remove("active");
  unitCm.classList.remove("active");
  
  switch(unit) {
    case "inches":
      unitInches.classList.add("active");
      document.getElementById("length").placeholder = "Enter Length in inches";
      document.getElementById("width").placeholder = "Enter Width in inches";
      document.getElementById("height").placeholder = "Enter Height in inches";
      break;
    case "mm":
      unitMm.classList.add("active");
      document.getElementById("length").placeholder = "Enter Length in mm";
      document.getElementById("width").placeholder = "Enter Width in mm";
      document.getElementById("height").placeholder = "Enter Height in mm";
      break;
    case "cm":
      unitCm.classList.add("active");
      document.getElementById("length").placeholder = "Enter Length in cm";
      document.getElementById("width").placeholder = "Enter Width in cm";
      document.getElementById("height").placeholder = "Enter Height in cm";
      break;
  }
}
