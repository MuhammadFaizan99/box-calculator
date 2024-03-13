<?php
/*
Plugin Name: My BMI Calculator
Description: A simple BMI calculator plugin.
Version: 1.0
Author: Muhammad Faizan
*/

function my_bmi_calculator_enqueue()
{
    wp_enqueue_style('my-bmi-calculator-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('my-bmi-calculator-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), false, true);
}
add_action('wp_enqueue_scripts', 'my_bmi_calculator_enqueue');

function my_bmi_calculator_shortcode()
{
    ob_start();
    // Include the calculator HTML here
?>
    <!-- Your Calculator HTML goes here -->
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@700&family=Poppins:wght@500&family=Roboto:wght@300&display=swap" rel="stylesheet">
        <title>Calculator</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    </head>

    <body>
        <div class="bmi-main-container">
            <div class="bmicalculator">
                <div class="unit-options">
                    <label>Choose Units:</label>
                    <div class="main-unit-options">
                        <input type="radio" name="units" value="us" checked> US Units
                        <input type="radio" name="units" value="metric"> Metric Units
                    </div>
                </div>
                <div class="input-row">
                    <label for="age">Age</label>
                    <input type="number" placeholder="Age" id="age" name="age" required>
                </div>
                <div class="gender">
                    <label>Gender</label>
                    <div class="gender-options">
                        <input type="radio" name="gender" value="male" checked> Male
                        <input type="radio" name="gender" value="female"> Female
                    </div>
                </div>
                <div class="input-row">
                    <label for="height">Height</label>
                    <div class="height-input">
                        <input type="number" id="height-feet" name="height-feet" placeholder="Feet" required>
                        <input type="number" id="height-inches" name="height-inches" placeholder="Inches" required>
                        <input type="number" id="height-cm" name="height-cm" placeholder="Height (cm)" style="display: none;" required>
                    </div>
                </div>
                <div class="input-row">
                    <label for="weight">Weight</label>
                    <input type="number" placeholder="Weight (pounds)" id="weight" name="weight" required>
                </div>
                <button id="calculate">Calculate</button>
            </div>
            <div class="bmiresults">
                <h3 class="results-heading">Result</h3>
                <div class="results-content">
                    <div id="bmiGaugeChartContainer">
                        <canvas id="bmiGaugeChart" width="200" height="200"></canvas>
                    </div>
                    <div id="bmiResult"></div>
                </div>
            </div>
        </div>

        <script src="script.js"></script>
    </body>

    </html>

<?php
    return ob_get_clean();
}
add_shortcode('bmi_calculator', 'my_bmi_calculator_shortcode');
