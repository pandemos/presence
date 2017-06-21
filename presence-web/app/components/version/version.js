'use strict';

angular.module('presence.version', [
  'presence.version.interpolate-filter',
  'presence.version.version-directive'
])

.value('version', '0.1');
