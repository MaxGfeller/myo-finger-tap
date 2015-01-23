var fs = require('fs')
var Myo = require('myo')

var m = Myo.create()

var streams = []
var currentFinger = 1

;[1, 2, 3, 4, 5].map(function(fingerIndex, i) {
  s = fs.createWriteStream(__dirname + '/data/finger' + fingerIndex + '.csv')
  s.write('orientation.x,orientation.y,orientation.z,accelerometer.x,accelerometer.y,accelerometer.z,gyroscope.x,gyroscope.y,gyroscope.z\n')
  streams.push(s)
  setTimeout(function() {
    currentFinger = fingerIndex
    console.log('Tap finger ' + fingerIndex + ' please')
  }, i * 1000)
})

m.on('imu', function(data) {
  var serializedData = ''
  serializedData += data.orientation.x + ','
  serializedData += data.orientation.y + ','
  serializedData += data.orientation.z + ','
  serializedData += data.accelerometer.x + ','
  serializedData += data.accelerometer.y + ','
  serializedData += data.accelerometer.z + ','
  serializedData += data.gyroscope.x + ','
  serializedData += data.gyroscope.y + ','
  serializedData += data.gyroscope.z + '\n'

  streams[currentFinger - 1].write(serializedData)
})

setTimeout(function() {
  streams.map(function(s) {
    s.end()
  })
  process.exit()
}, 5000)
