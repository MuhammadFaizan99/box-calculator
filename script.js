function calculatePrice() {
  const productName = document.getElementById("productName").value;
  const paperQuality = document.getElementById("paperQuality").value;
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const sizeUnit = document.querySelector(
    'input[name="sizeUnit"]:checked'
  ).value;
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

  const areaOfBox = 2*(
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

  document.getElementById("result").innerHTML = `Price/Box: PKR ${(
    price.toFixed(2) / quantity
  ).toFixed(2)}<br>Total Price of Box: PKR ${price.toFixed(2)}`;
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
      return 0.23;
    case "rectangle":
      return 0.2;
    case "pizza":
      return 0.22;
    case "tuck_in":
      return 0.18;
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
