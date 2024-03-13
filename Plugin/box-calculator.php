<?php
/*
Plugin Name: My Box Calculator
Description: A simple Box calculator plugin.
Version: 1.0
Author: Muhammad Faizan
*/

function my_box_calculator_enqueue()
{
    wp_enqueue_style('my-box-calculator-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('my-box-calculator-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), false, true);
}
add_action('wp_enqueue_scripts', 'my_box_calculator_enqueue');

function my_box_calculator_shortcode()
{
    ob_start();
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Box Calculator</title>
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    </head>

    <body>


        <div class="price-calculator-container">
            <h2>Box Price Calculator</h2>
            <div class="main-unit-buttons">
                <div class="unit-buttons">
                    <button id="unitInches" onclick="changeUnit('inches')">Inches</button>
                    <button id="unitMm" onclick="changeUnit('mm')">mm</button>
                    <button id="unitCm" onclick="changeUnit('cm')">cm</button>
                </div>
            </div>
            <div class="main-section">
                <div class="left-side">
                    <div>
                        <label for="productName">Product Name:</label>
                        <select id="productName" onchange="displaySelectedImages()">
                            <option value="mailer">Mailer Boxes</option>
                            <option value="folding">Folding Carton Boxes</option>
                            <option value="rigid">Rigid Boxes</option>
                            <option value="magnetic">Magnetic Rigid Boxes</option>
                            <option value="display">Display Boxes</option>
                            <option value="tray_sleeve">Tray and Sleeve Boxes</option>
                            <option value="cardboard_tubes">Cardboard Tubes</option>
                            <option value="foldable_lid_base">Foldable Lid and Base</option>
                            <option value="cake">Cake Boxes</option>
                            <option value="paper">Paper Bags</option>
                            <option value="pillow">Pillow Boxes</option>
                            <option value="shipping">Shipping Boxes</option>
                            <option value="rectangle">Rectangle</option>
                            <option value="pizza">Pizza Type</option>
                            <option value="tuck_in">Tuck in</option>
                        </select>
                    </div>
                    <div>
                        <label for="paperQuality">Paper Quality/Card Quality:</label>
                        <select id="paperQuality" onchange="displaySelectedImages()">
                            <option value="kraft">Kraft Paper</option>
                            <option value="white">White Cardboard</option>
                            <option value="corrugated">Corrugated Cardboard</option>
                            <option value="coated">Coated Paperboard</option>
                            <option value="fbb">Folding Box Board (FBB)</option>
                        </select>
                    </div>
                    <div>
                        <label>Size of Box:</label>
                        <div class="size-box">
                            <input type="number" id="length" placeholder="Enter Length in inches">
                            <input type="number" id="width" placeholder="Enter Width in inches">
                            <input type="number" id="height" placeholder="Enter Height in inches">
                        </div>
                    </div>
                    <div>
                        <label for="color">Color of Box:</label>
                        <select id="color">
                            <option value="brown">Brown</option>
                            <option value="white">White</option>
                        </select>
                    </div>
                </div>
                <div class="right-side">
                    <div>
                        <label for="print">Print:</label>
                        <select id="print">
                            <option value="none">None</option>
                            <option value="single">Single Colour</option>
                            <option value="multi">Multi Colour (CMYK)</option>
                        </select>
                    </div>
                    <div>
                        <label for="coating">Coating:</label>
                        <select id="coating">
                            <option value="thermalGloss">Thermal Gloss</option>
                            <option value="pvcLamination">PVC Lamination</option>
                            <option value="emboss">Emboss</option>
                            <option value="silver">Silver</option>
                            <option value="leafFull">Leaf Full</option>
                            <option value="hybridDripoff">Hybrid (Dripoff)</option>
                            <option value="varnishCoating">Varnish Coating</option>
                            <option value="thermalMATT">Thermal MATT</option>
                            <option value="spotUV">Spot UV</option>
                            <option value="mattHalf">Matt Half</option>
                            <option value="halfGlossLamination">Half Gloss Lamination</option>
                            <option value="mattLamination">Matt Lamination</option>
                            <option value="glossLamination">Gloss Lamination</option>
                            <option value="leaf">Leaf</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    <div>
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity">
                    </div>
                    <div class="image-container">
                        <div id="productImageContainer"></div>
                        <div id="paperQualityImageContainer"></div>
                    </div>
                    <div id="result"></div>
                </div>
            </div>
            <div class="price-buttons">
                <button class="calculatePrice" onclick="calculatePrice()">Calculate Price</button>
            </div>
        </div>
        <script src="script.js"></script>
    </body>

    </html>
<?php
    return ob_get_clean();
}
add_shortcode('box_calculator', 'my_box_calculator_shortcode');