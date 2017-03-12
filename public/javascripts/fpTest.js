/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */


angular.module('myApp').controller('ctrlRead', function ($scope, $http, $timeout) {

// Extension for 'Projektarbeit SS2016' - start

    function logArrayElements(element, index, array) {
        console.log('a[' + index + '] = ' + element);
    }

    var options = {excludeAvailableMediaDevices: false};

    var data = {
        fingerprint: {}
    }

    new Fingerprint2(options).get(function (result, components) {
        console.log("Calculated hash of fingerprint2: " + result); //a hash, representing your device fingerprint
        console.log(components);// an array of FP components

        data.fingerprint.hash = result;
        //$http.post('/identify', data);
    });

    new Fingerprint2Extended(options).get(function (result, components) {
        console.log("Calculated hash extended fingerprint2: " + result); //a hash, representing your device fingerprint
        console.log(components);// an array of FP components

        navigator.mediaDevices.enumerateDevices().then(
            // Loggen der Nachricht und des Wertes

            function(devices) {
                console.log("test");
                console.log(devices);

                devices.forEach(logArrayElements);

                data.fingerprint.devices = devices;
            });

        //console.log(navigator.mediaDevices.getSupportedConstraints());
        //console.log(navigator.mediaDevices.getUserMedia());
        //MediaDevices;
        /*var data = {
            fingerprint: {
                'hash': result,
                'extended': result,
            },
        };*/

        data.fingerprint.extended = result;
        $http.post('/identify', data);
    });
// Extension for 'Projektarbeit SS2016' - end
});

