/**
 * The source code was almost fully copied from these docs:
 * https://www.npmjs.com/package/ng-file-upload
 * http://jsfiddle.net/danialfarid/0mz6ff9o/135/
 */
import angular from 'angular';
import 'ng-file-upload';

const app = angular.module('app', ['ngFileUpload']);

app.controller('Upload', ($scope, Upload, $timeout) => {
  $scope.uploadFiles = (file, errFiles) => {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: { file },
      });

      file.upload.then(
        response => {
          $timeout(() => {
            file.result = response.data;
          });
        },
        response => {
          if (response.status > 0) $scope.errorMsg = `${response.status}: ${response.data}`;
        },
        evt => {
          file.progress = Math.min(100, parseInt((100.0 * evt.loaded) / evt.total, 10));
        },
      );
    }
  };
});
