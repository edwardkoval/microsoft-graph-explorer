angular.module('ApiExplorer')
    .directive('apiExplorer', function() {
        return {
            scope: {
                strings: '=',
                language: '=',
                scopes: '=',
                adminScopes: '=',
                clientId: '=',
                redirectUrl: '=',
            },
            templateUrl: '/views/explorer.html',
            controller: function ($scope) {

                // default strings
                $scope.str = loc_strings['en_us'];

                // if the user specified a language, use that instead
                if ($scope.language) {
                    $scope.str = loc_strings[$scope.language];
                }

                // merge $scope.strings into $scope.str
                angular.extend($scope.str, $scope.strings);


                hello.init( {
                    msft: $scope.clientId
                }, {
                    scope: $scope.scopes
                });

                hello.init( {
                    msft_admin_consent: $scope.clientId,
                    msft_token_refresh: $scope.clientId,
                }, {});
            }
        };
    });