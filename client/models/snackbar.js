export default class Snackbar {
  constructor (
    text,
    buttonColor = 'primary',
    timeout = 10000
  ) {
    this.text = text
    this.buttonColor = buttonColor
    this.timeout = timeout
    this.show = true
  }
}
