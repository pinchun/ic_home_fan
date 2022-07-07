input.onButtonPressed(Button.A, function () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 200)
})
input.onButtonPressed(Button.B, function () {
    motor.motorStop(motor.Motors.M1)
})
function RGB_LED () {
    for (let index = 0; index < 10; index++) {
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P14, randint(100, 1023))
        pins.analogWritePin(AnalogPin.P15, randint(100, 1023))
        pins.analogWritePin(AnalogPin.P16, randint(100, 1023))
        basic.pause(100)
    }
}
let FIRE = 0
let LIGHT = 0
let PEOPLE = 0
let RAIN = 0
let HUMID = 0
let TEMP = 0
serial.redirectToUSB()
motor.servo(motor.Servos.S3, 90)
pins.analogWritePin(AnalogPin.P14, 0)
pins.analogWritePin(AnalogPin.P15, 0)
pins.analogWritePin(AnalogPin.P16, 0)
basic.forever(function () {
    basic.showIcon(IconNames.House)
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P2,
    true,
    false,
    true
    )
    TEMP = dht11_dht22.readData(dataType.temperature)
    HUMID = dht11_dht22.readData(dataType.humidity)
    RAIN = pins.analogReadPin(AnalogPin.P0)
    PEOPLE = pins.digitalReadPin(DigitalPin.P13)
    LIGHT = pins.digitalReadPin(DigitalPin.P12)
    FIRE = pins.digitalReadPin(DigitalPin.P1)
    serial.writeValue("T", TEMP)
    serial.writeValue("H", HUMID)
    serial.writeValue("R", RAIN)
    serial.writeValue("P", PEOPLE)
    serial.writeValue("L", LIGHT)
    RGB_LED()
    if (TEMP != -999) {
        basic.clearScreen()
        basic.showString("T:")
        basic.showNumber(TEMP)
        basic.showString("H:")
        basic.showNumber(HUMID)
    }
    basic.clearScreen()
    if (RAIN > 30) {
        motor.servo(motor.Servos.S3, 180)
        basic.showIcon(IconNames.Sad)
    } else {
        motor.servo(motor.Servos.S3, 90)
        basic.showIcon(IconNames.Happy)
    }
    basic.clearScreen()
    if (PEOPLE == 0) {
        basic.showString("BYE~ BYE~")
    } else {
        basic.showString("WELCOME")
    }
    basic.clearScreen()
    if (LIGHT == 0) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.SmallHeart)
    }
    if (FIRE == 1) {
        basic.showIcon(IconNames.Duck)
    } else {
        for (let index = 0; index < 3; index++) {
            basic.showIcon(IconNames.Surprised)
            basic.showIcon(IconNames.TShirt)
            basic.showIcon(IconNames.Chessboard)
        }
    }
})
