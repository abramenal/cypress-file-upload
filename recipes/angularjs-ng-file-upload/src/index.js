/**
 * The source code was almost fully copied from these docs:
 * https://www.npmjs.com/package/ng-file-upload
 * http://jsfiddle.net/danialfarid/0mz6ff9o/135/
 */
import angular from 'angular';
import 'ng-file-upload';

const app = angular.module('app', ['ngFileUpload']);

app.controller('Upload', ($scope, Upload, $timeout) => {
  $scope.uploadFiles = (files, errFiles) => {
    $scope.files = files;
    $scope.errFiles = errFiles;

    $scope.files = files;
    if (files && files.length) {
      Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {
          files: files,
        },
      }).then(
        function(response) {
          $timeout(function() {
            $scope.result = response.data;
          });
        },
        function(response) {
          if (response.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
          }
        },
        function(evt) {
          $scope.progress = Math.min(100, parseInt((100.0 * evt.loaded) / evt.total));
        },
      );
    }
  };
});
