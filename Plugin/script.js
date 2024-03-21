// Object containing image URLs for each Product Name
const productImages = {
  mailer:
    "https://static.vecteezy.com/system/resources/previews/013/362/649/non_2x/cardboard-box-brown-free-png.png",
  folding:
    "https://5.imimg.com/data5/SELLER/Default/2022/8/OV/YX/QW/24057945/folding-cartons-packaging-box-500x500.png",
  rigid:
    "https://www.emenacpackaging.com/wp-content/uploads/2021/12/Fliptop-Rigid-Boxes-2.webp",
  magnetic:
    "https://5.imimg.com/data5/IW/LX/SF/SELLER-71546247/lcbm9-500x500.jpg",
  display:
    "https://miro.medium.com/v2/resize:fit:828/format:webp/1*-QgRXew_c2XBDrrWMbuxAw.jpeg",
  tray_sleeve: "https://www.liquidprinter.com/images/custom-sleeve-box.jp",
  cardboard_tubes:
    "https://m.media-amazon.com/images/I/61IYZ2C+HiL._AC_SY300_SX300_.jpg",
  foldable_lid_base:
    "https://i5.walmartimages.com/asr/adbb1c07-2792-4d5e-8567-6bdc314ade5e.21616d58a2edb6bf2f1934d5afc11705.png?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
  cake: "https://m.media-amazon.com/images/I/51bnigyaEDL._AC_SL1500_.jpg",
  paper:
    "https://cdn-hallh.nitrocdn.com/SAfCWcaKwKxWFpBYamCDCMxSsjTmthln/assets/images/optimized/rev-ceff243/nashonuma.com/wp-content/uploads/2021/11/kraft-paper-bags.jpg",
  pillow:
    "https://s3.amazonaws.com/sireprinting.com/products/1654375989Kraft%20Pillow%20Boxes%20Sire%20Printing%2006.png-gallery4",
  shipping:
    "https://www.arteau.com/wp-content/uploads/2018/06/boites-1.jpg.webp",
  rectangle:
    "https://image.jimcdn.com/app/cms/image/transf/dimension=1820x1280:format=png/path/sd8122626139b36bd/image/i38255a44fbc4fc8c/version/1686253539/image.png",
  pizza: "https://mmwillcare.com/storage/products/b4.jpg",
  tuck_in: "https://img.uline.com/is/image/uline/HD10_8351?$UtilityRHD$",
};

// Object containing image URLs for each Paper Quality/Card Quality
const paperQualityImages = {
  kraft:
    "https://www.varietypapers.com.pk/wp-content/uploads/2020/08/412jwDZvGnL.jpg",
  white:
    "https://5.imimg.com/data5/NX/DF/MY-31341022/fbb-coated-board-500x500.jpg",
  corrugated: "https://m.media-amazon.com/images/I/91tVjDpEZuL._AC_SL1500_.jpg",
  coated:
    "https://www.greypaperboard.com/img5564.weyesimg.com/uploads/gaii0lsc.allweyes.com/images/15505563328652de47.jpg?imageView2/2/w/1920/q/100",
  fbb: "https://5.imimg.com/data5/SELLER/Default/2023/1/UG/RJ/JV/583245/folding-box-board-fbb-500x500.jpg",
  bleach_card:
    "https://stationers.pk/cdn/shop/products/BleachCardSheet22X28OffWhite.jpg?v=1673335811&width=600",
};

// Function to display selected images
function displaySelectedImages() {
  const productName = document.getElementById("productName").value;
  const paperQuality = document.getElementById("paperQuality").value;
  const productImage = productImages[productName];
  const paperQualityImage = paperQualityImages[paperQuality];
  const productImageContainer = document.getElementById(
    "productImageContainer"
  );
  const paperQualityImageContainer = document.getElementById(
    "paperQualityImageContainer"
  );

  // Clear previous images
  productImageContainer.innerHTML = "";
  paperQualityImageContainer.innerHTML = "";

  // Insert Product Name image
  if (productImage) {
    const productImg = document.createElement("img");
    productImg.src = productImage;
    productImg.alt = productName;
    productImageContainer.appendChild(productImg);
    productImg.classList.add("fade-in");
  }

  // Insert Paper Quality image
  if (paperQualityImage) {
    const paperQualityImg = document.createElement("img");
    paperQualityImg.src = paperQualityImage;
    paperQualityImg.alt = paperQuality;
    paperQualityImageContainer.appendChild(paperQualityImg);
    paperQualityImg.classList.add("fade-in");
  }
  const mmContainer = document.getElementById("mmContainer");
  if (paperQuality === "corrugated") {
    mmContainer.style.display = "flex";
  } else {
    mmContainer.style.display = "none";
  }

  // Show/hide gsmContainer based on Paper Quality
  const gsmContainer = document.getElementById("gsmContainer");
  if (paperQuality === "bleach_card") {
    gsmContainer.style.display = "flex";
  } else {
    gsmContainer.style.display = "none";
  }
}

// Function to calculate the price and display the result
function calculatePrice() {
  const productName = document.getElementById("productName").value;
  const paperQuality = document.getElementById("paperQuality").value;
  const corrugatedThickness = document.querySelector(
    'input[name="mm_corrugated"]:checked'
  )?.id;
  const gsm = document.querySelector('input[name="gsm"]:checked')?.id;
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
  const hasLedWindow = document.getElementById("ledWindow").checked;

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
    const errorMessage =
      "Please fill in the following fields: " + errorMessages.join(", ");
    document.getElementById(
      "result"
    ).innerHTML = `<span style="color: red;">${errorMessage}</span>`;
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

  const areaOfBox =
    2 *
    (size.length * size.width +
      size.length * size.height +
      size.width * size.height);
  const productBase = getProductBase(productName);
  const paperQualityBase = getPaperQualityBase(
    paperQuality,
    corrugatedThickness,
    gsm
  );
  const colorBase = getColorBase(color);
  const printBase = getPrintBase(print);
  const coatingBase = getCoatingBase(coating);
  const ledWindowArea = hasLedWindow ? areaOfBox * 0.1 : 0;

  let price =
  quantity *
  (areaOfBox * productBase +
    areaOfBox * paperQualityBase +
    areaOfBox * colorBase +
    areaOfBox * printBase +
    areaOfBox * coatingBase +
    ledWindowArea);

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Price/Box: PKR ${(
    price.toFixed(2) / quantity
  ).toFixed(2)}<br>Total Price of Box: PKR ${price.toFixed(2)}`;

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
    case "product_none":
      return 0.0;
    default:
      return 0;
  }
}

function getPaperQualityBase(paperQuality, corrugatedThickness, gsm) {
  switch (paperQuality) {
    case "kraft":
      return 0.06;
    case "white":
      return 0.05;
    case "corrugated":
      switch (corrugatedThickness) {
        case "single_layer":
          return 0.05;
        case "3_mm":
          return 0.09;
        case "5_mm":
          return 0.13;
        default:
          return 0.0;
      }
    case "coated":
      return 0.04;
    case "fbb":
      return 0.04;
    case "bleach_card":
      if (gsm) {
        switch (gsm) {
          case "270_gsm":
            return 0.3;
          case "300_gsm":
            return 0.4;
          case "350_gsm":
            return 0.5;
          default:
            return 0.0;
        }
      } else {
        return 0.05;
      }
    default:
      return 0;
  }
}

function getColorBase(color) {
  switch (color) {
    case "none-color":
      return 0.0;
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
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");

  let lengthValue = parseFloat(lengthInput.value);
  let widthValue = parseFloat(widthInput.value);
  let heightValue = parseFloat(heightInput.value);

  switch (unit) {
    case "inches":
      // Convert to inches if currently in mm or cm
      if (document.getElementById("unitMm").classList.contains("active")) {
        lengthValue /= 25.4;
        widthValue /= 25.4;
        heightValue /= 25.4;
      } else if (
        document.getElementById("unitCm").classList.contains("active")
      ) {
        lengthValue /= 2.54;
        widthValue /= 2.54;
        heightValue /= 2.54;
      }
      break;
    case "mm":
      // Convert to mm if currently in inches or cm
      if (document.getElementById("unitInches").classList.contains("active")) {
        lengthValue *= 25.4;
        widthValue *= 25.4;
        heightValue *= 25.4;
      } else if (
        document.getElementById("unitCm").classList.contains("active")
      ) {
        lengthValue *= 10;
        widthValue *= 10;
        heightValue *= 10;
      }
      break;
    case "cm":
      // Convert to cm if currently in inches or mm
      if (document.getElementById("unitInches").classList.contains("active")) {
        lengthValue *= 2.54;
        widthValue *= 2.54;
        heightValue *= 2.54;
      } else if (
        document.getElementById("unitMm").classList.contains("active")
      ) {
        lengthValue /= 10;
        widthValue /= 10;
        heightValue /= 10;
      }
      break;
  }

  // Update input values
  lengthInput.value = lengthValue.toFixed(2);
  widthInput.value = widthValue.toFixed(2);
  heightInput.value = heightValue.toFixed(2);

  // Update placeholders
  switch (unit) {
    case "inches":
      lengthInput.placeholder = "Enter Length in inches";
      widthInput.placeholder = "Enter Width in inches";
      heightInput.placeholder = "Enter Height in inches";
      break;
    case "mm":
      lengthInput.placeholder = "Enter Length in mm";
      widthInput.placeholder = "Enter Width in mm";
      heightInput.placeholder = "Enter Height in mm";
      break;
    case "cm":
      lengthInput.placeholder = "Enter Length in cm";
      widthInput.placeholder = "Enter Width in cm";
      heightInput.placeholder = "Enter Height in cm";
      break;
  }

  // Update active class
  document.getElementById("unitInches").classList.remove("active");
  document.getElementById("unitMm").classList.remove("active");
  document.getElementById("unitCm").classList.remove("active");
  document
    .getElementById(`unit${unit.charAt(0).toUpperCase() + unit.slice(1)}`)
    .classList.add("active");
}

window.addEventListener("DOMContentLoaded", (event) => {
  // Set default values for input fields
  document.getElementById("unitInches").classList.add("active");
  document.getElementById("unitMm").classList.remove("active");
  document.getElementById("unitCm").classList.remove("active");
  document.getElementById("productName").value = "mailer";
  document.getElementById("paperQuality").value = "kraft";
  document.getElementById("length").value = "8";
  document.getElementById("width").value = "8";
  document.getElementById("height").value = "4";
  document.getElementById("color").value = "brown";
  document.getElementById("print").value = "none";
  document.getElementById("coating").value = "none";
  document.getElementById("quantity").value = "500";

  // Display selected images and calculate price
  displaySelectedImages();
  calculatePrice();
});